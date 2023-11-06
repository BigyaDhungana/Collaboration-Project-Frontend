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

const Viewdoc = () => {
  const searchParam = useSearchParams();
  const docName = searchParam.get("dtitle");
  const route = useRouter();
  const markdown = `
 # heading 

## sub

- one
- teo

  *hello*

  ## jkdfl

  **jkfd**
  ! [test](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT50hnwfx3suGC7Nhg1mTRdd1iPkFXI4eJBN8IrkAtu-w&s)

  ![Alt text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr5Y-TkjeRslcBNc6Ry0FznitnCZdiB3Duc8Xm2rDGnJdWNg13nZbHvRjeyyW-N4hW3_E&usqp=CAU "a title")
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
