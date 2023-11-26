"use client";

import {
  Box,
  Center,
  Heading,
  ScrollView,
  Button,
  ButtonText,
  Divider,
} from "@gluestack-ui/themed";
import { useSearchParams } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useLocalData } from "../../../../../hooks/useLocalData";
import { getDocumentBody } from "../../../../../apiFunc/documents";

const Viewdoc = () => {
  const { authToken, isMounted } = useLocalData();

  const searchParam = useSearchParams();
  const docName = searchParam.get("title");
  const docId = searchParam.get("id");
  const route = useRouter();

  const documentBodyResponse = useQuery({
    queryKey: ["documentBody", { document: docId }],
    queryFn: () => getDocumentBody(authToken, { document: docId }),
    enabled: isMounted,
  });
  console.log(documentBodyResponse.data, "data");
  const markdown = documentBodyResponse.data?.body;

  const handdleGoBack = () => {
    route.push("/projectdash/documentation");
  };

  return (
    <Box w="80%">
      <Box borderWidth="0.5px" width="100%" p="10px" m="10px">
        <Center>
          <Heading>{docName}</Heading>
        </Center>
        <Divider></Divider>
        <ScrollView h="430px" m="10px">
          <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
        </ScrollView>
      </Box>
      <Center>
        <Button width="200px" onPress={handdleGoBack}>
          <ButtonText>Go Back</ButtonText>
        </Button>
      </Center>
    </Box>
  );
};

export default Viewdoc;
