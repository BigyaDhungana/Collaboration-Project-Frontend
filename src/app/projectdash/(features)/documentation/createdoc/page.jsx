"use client";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import {
  Box,
  Center,
  Heading,
  ScrollView,
  Button,
  ButtonText,
  Input,InputField, Divider
} from "@gluestack-ui/themed";
import "../../../css/features.css"
import { useRouter } from "next/navigation";

const Createdoc = () => {
  
  const route=useRouter();

  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: "Remove this and start writing 👍",
  });

  const [title,setTitle]=useState("")

  const handleSave=()=>{
    const markdownOutput = editor.storage.markdown.getMarkdown();
    if (!title && markdownOutput ){
      alert("Fill all the fields")
    }
    else{
      console.log(markdownOutput,title)
      alert("saved")
      route.push("/projectdash/documentation");
    }
  }

  return (
    <Box w="80%">
      <Center>
        <Input
          w="400px"
          borderBlockColor="#3b2c2b"
         
        >
          <InputField
            placeholder="Enter title"
            textAlign="center"
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          ></InputField>
        </Input>
      </Center>
      <Box borderWidth="0.5px" width="100%" p="10px" m="10px">
        <Center>
          <Heading>Content</Heading>
        </Center>
        <Divider></Divider>
        <ScrollView h="430px" m="10px">
          <EditorContent editor={editor} />
        </ScrollView>
      </Box>
      <Center>
        <Button width="200px" onPress={handleSave}>
          <ButtonText>Save</ButtonText>
        </Button>
      </Center>
    </Box>
  );
  
};

export default Createdoc;
