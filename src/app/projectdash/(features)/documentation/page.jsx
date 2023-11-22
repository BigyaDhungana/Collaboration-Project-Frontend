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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalData } from "../../../../hooks/useLocalData";
//test
const projList = ["ine", "teo", "three", "four", "five"];

const Documentation = () => {
  const router = useRouter();
  const {authToken,isMounted}=useLocalData()
  // const docListResponse = useQuery({
  //   queryKey: ["doclist"],
  //   queryFn: () => getDocumentListApi(authToken),
  //   enabled:isMounted,
  // });

  //prevent ssr
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  // if (!isMounted) return;

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
  };
  // if (!isMounted) {
  //   return;
  // }
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
            {projList.map((element, index) => {
              return (
                <option value={element} key={index}>
                  {element}
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
