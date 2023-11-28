"use client";
import { useState, useEffect } from "react";
import VNavbar from "../../components/vNavbar";
import Headerbar from "../../../maindash/components/header";
import { config } from "../../../../../config/gluestack-ui.config";
import {
  GluestackUIProvider,
  VStack,
  HStack,
  Center,
  Heading,
  Box,
  ScrollView,
  Button,
  ButtonText,
  Text,
  set,
} from "@gluestack-ui/themed";
import "../../css/features.css";
import { useRouter } from "next/navigation";
import { documents } from "../../../testdata/data";
import { queryParamGenerator } from "../../../../utils/querypara";
import {
  getDocumentListApi,
  deleteDocumentApi,
} from "../../../../apiFunc/documents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalData } from "../../../../hooks/useLocalData";
import { showToast } from "../../../../utils/toasT";

const Documentation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { authToken, isMounted, metaData } = useLocalData();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [doclist, setDoclist] = useState([]);
  const [projValue, setProjValue] = useState("none");
  const [update, setUpdate] = useState(false);

  const docListResponse = useQuery({
    queryKey: ["doclist", { project: Number(selectedProjectId) }, update],
    queryFn: () =>
      getDocumentListApi(authToken, { project: Number(selectedProjectId) }),
    enabled: !!selectedProjectId,
  });

  useEffect(() => {
    if (docListResponse.data) {
      setDoclist(docListResponse.data);
    }
  }, [docListResponse.data]);

  const deletedocResponse = useMutation({
    mutationFn: (id) => {
      deleteDocumentApi(authToken, { document: id });
    },
    onSuccess: () => {
      showToast("Document deleted successfully", "success");
      setUpdate(!update);
      docListResponse.refetch();
    },
    onError: () => {
      showToast("Error deleting document", "error");
    },
  });

  const handleDocsNav = (docId, docName) => {
    router.push(
      "/projectdash/documentation/viewdoc" +
        "?" +
        queryParamGenerator("id", docId) +
        "&" +
        queryParamGenerator("title", docName)
    );
  };

  const handleCreateDoc = () => {
    router.push("/projectdash/documentation/createdoc");
  };

  const handleDelete = (id, name) => {
    const userRes = prompt(`Are you sure you want to delete ${name} ?`, "YES");
    if (userRes === "YES") {
      deletedocResponse.mutate(id);
    }
  };

  const handleProjectSelection = (e) => {
    console.log(e.target.value);
    setSelectedProjectId(e.target.value);
    setProjValue(e.target.value);
  };

  if (docListResponse.isLoading) {
    return <div>Loading...</div>;
  }
  if (docListResponse.isError) {
    return <div>Error</div>;
  }
  if (!isMounted) {
    return;
  }

  return (
    <Box w="80%">
      <Center>
        <Heading>Documentations</Heading>
      </Center>
      <Box borderWidth="0.5px" width="100%" p="10px" m="10px">
        <HStack space="sm">
          <Text bold>Project Name</Text>
          <select
            name="selectProjectName"
            id="pname"
            value={projValue}
            onChange={handleProjectSelection}
          >
            <option value="none" disabled hidden>
              Select a project
            </option>
            {metaData.map((element) => {
              return (
                <option value={element.project_id} key={element.project_id}>
                  {element.project_name}
                </option>
              );
            })}
          </select>
        </HStack>

        <ScrollView h="430px" m="10px">
          {docListResponse.isLoading && <Loading size="small" />}
          {doclist.map((doc) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "50px",
                }}
                key={doc.id}
              >
                <Button
                  variant="link"
                  onPress={() => {
                    handleDocsNav(doc.id, doc.title);
                  }}
                >
                  <ButtonText>{doc?.title}</ButtonText>
                </Button>
                <Button
                  action="negative"
                  variant="link"
                  onPress={() => {
                    handleDelete(doc.id, doc.title);
                  }}
                >
                  <ButtonText>Delete</ButtonText>
                </Button>
              </div>
            );
          })}
        </ScrollView>
      </Box>
      <Center>
        <Button width="200px" onPress={handleCreateDoc}>
          <ButtonText>Create Document</ButtonText>
        </Button>
      </Center>
    </Box>
  );
};

export default Documentation;
