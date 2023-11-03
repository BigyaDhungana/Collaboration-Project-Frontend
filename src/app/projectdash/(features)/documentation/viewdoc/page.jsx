"use client";

import {
  Box,
  Center,
  Heading,
  ScrollView,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { useSearchParams } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";

const Viewdoc = () => {
  const searchParam = useSearchParams();
  const docName = searchParam.get("dtitle");
  const route = useRouter();
  const markdown = `
  # title
  ## subtitile
  A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

    const handdleGoBack=()=>{
        route.push("/projectdash/documentation")
    }

  return (
    <Box w="80%">
      <Box borderWidth="0.5px" width="100%" p="10px" m="10px">
        <Center>
          <Heading>{docName}</Heading>
        </Center>
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
