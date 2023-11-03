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
} from "@gluestack-ui/themed";
import "../../css/features.css";
import { useRouter } from "next/navigation";
import { documents } from "../../../testdata/data";

//test
import {queryParamGenerator} from "../../../../utils/querypara"

const Documentation = () => {

  const router=useRouter()

  //prevent ssr
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;

  const handleDocsNav = (docname) => {
    router.push(
      "/projectdash/documentation/viewdoc" +
        "?" +
        queryParamGenerator("dtitle", docname)
    );
  };

  return (
    <Box w="80%">
      <Box borderWidth="0.5px" width="100%" p="10px" m="10px">
        <Center>
          <Heading>Documentations</Heading>
        </Center>
        <ScrollView h="430px" m="10px">
          {documents.map((obj) => {
            return (
              <Button key={obj.key} variant="link" onPress={()=>{handleDocsNav(obj.title);}}>
                <ButtonText>{obj.title}</ButtonText>
              </Button>
            );
          })}
        </ScrollView>
      </Box>
      <Center>
        <Button width="200px">
          <ButtonText>Create Document</ButtonText>
        </Button>
      </Center>
    </Box>
  );
};

export default Documentation;
