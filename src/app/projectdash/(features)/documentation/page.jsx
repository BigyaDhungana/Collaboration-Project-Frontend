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
} from "@gluestack-ui/themed";
import "../../css/features.css";
import { useRouter } from "next/navigation";
import { documents } from "../../../testdata/data";
import { queryParamGenerator } from "../../../../utils/querypara";
import { getDocumentListApi } from "../../../../apiFunc/documents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalData } from "../../../../hooks/useLocalData";
import { showToast } from "../../../../utils/toasT";
//test
const projList = ["ine", "teo", "three", "four", "five"];

const Documentation = () => {
  const queryClient=useQueryClient();
  const router = useRouter();
  const { authToken, isMounted, metaData } = useLocalData();
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // const docListResponse = useQuery({
  //   queryKey: ["doclist", { project: Number(selectedProjectId) }],
  //   queryFn: () =>
  //     getDocumentListApi(authToken, { project: Number(selectedProjectId) }),
  //   enabled: !!selectedProjectId,
  // });
  // if (docListResponse.isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (docListResponse.isError) {
  //   return <div>Error</div>;
  // }

// const deletedocResponse=useMutation({
//   mutationFn:(id)=>{deleteDocumentApi(authToken,{document:id})},
//   onSuccess:()=>{
//     showToast("Document deleted successfully","success")
//     queryClient.invalidateQueries("doclist");
//   },
//   onError:()=>{
//     showToast("Error deleting document","error");
//   }
// })

  const handleDocsNav = (docname) => {
    router.push(
      "/projectdash/documentation/viewdoc" +
        "?" +
        queryParamGenerator("dtitle", docname)
    );
  };

  const handleCreateDoc = () => {
    router.push("/projectdash/documentation/createdoc");
  };

  const handleProjectSelection = (e) => {
    console.log(e.target.value);
    setSelectedProjectId(e.target.value);
  };

  // console.log(docListResponse.data);

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
            defaultValue="none"
            onChange={handleProjectSelection}
          >
            <option value="none" disabled hidden>
              Select a project
            </option>
            {metaData.map((element) => {
              return (
                <option value={element.project_id} key={element.project_id}>
                  {element.project_id}
                </option>
              );
            })}
          </select>
        </HStack>

        <ScrollView h="430px" m="10px">
          {documents.map((obj, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "50px",
                }}
              >
                <Button
                  key={obj.key}
                  variant="link"
                  onPress={() => {
                    handleDocsNav(obj.title);
                  }}
                >
                  <ButtonText>{obj.title}</ButtonText>
                </Button>
                <Button action="negative" variant="link">
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
