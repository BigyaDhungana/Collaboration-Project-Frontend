"use client";
import { useRef, useState } from "react";
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
  Input,
  InputField,
  Divider,
  HStack,
  Text,
} from "@gluestack-ui/themed";
import "../../../css/features.css";
import { useRouter } from "next/navigation";
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  imagePlugin,
  DialogButton,
  CreateLink,
  linkDialogPlugin,
} from "@mdxeditor/editor";
import { UndoRedo } from "@mdxeditor/editor/plugins/toolbar/components/UndoRedo";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import { InsertImage } from "@mdxeditor/editor";
import { linkPlugin } from "@mdxeditor/editor/plugins/link";
import "../../../css/features.css";
import { useMutation } from "@tanstack/react-query";
import { uploadDocumentApi } from "../../../../../apiFunc/documents";
import { showToast } from "../../../../../utils/toasT";
import { useLocalData } from "../../../../../hooks/useLocalData";
//test
const projList = ["ine", "teo", "three", "four", "five"];

const Createdoc = () => {
  const route = useRouter();
  const ref = useRef();
  const { authToken, metaData, isMounted } = useLocalData();

  const uploaddocResponse = useMutation({
    mutationFn: (data) => {
      uploadDocumentApi(authToken, data);
    },
    onSuccess: () => {
      showToast("Document uploaded successfully", "success");
      route.push("/projectdash/documentation");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSave = () => {
    const markdownOutput = ref.current?.getMarkdown();

    if (title == "" || markdownOutput == "" || projectId == "") {
      showToast("Please fill all the fields", "error");
    } else {
      // console.log(markdownOutput, title, project);
      const data = {
        project: Number(projectId),
        title: title,
        body: markdownOutput,
      };
      uploaddocResponse.mutate(data);
      // console.log(data);
    }
  };

  if (!isMounted) {
    return;
  }

  return (
    <div className="cdocs-main">
      <HStack space="sm" mb="5px">
        <Text size="xl">Documentation for Project: </Text>
        <select
          name="selectProjectName"
          id="pname"
          defaultValue="none"
          className="selectlist"
          onChange={(e) => {
            setProjectId(e.target.value);
          }}
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

      <Center>
        <Input w="400px" borderBlockColor="#3b2c2b">
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
        <div className="div-scroll">
          {/* <EditorContent editor={editor} /> */}

          <MDXEditor
            ref={ref}
            markdown="remove this and start writing👍"
            plugins={[
              toolbarPlugin({
                toolbarContents: () => <ToolBar></ToolBar>,
              }),
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
              imagePlugin(),
              linkPlugin(),
              linkDialogPlugin(),
            ]}
            className="editor"
          />
        </div>
      </Box>
      <Center>
        <Button width="200px" onPress={handleSave}>
          <ButtonText>Save</ButtonText>
        </Button>
      </Center>
    </div>
  );
};

export default Createdoc;

const ToolBar = () => {
  return (
    <div className="toolbar">
      <UndoRedo />
      <BoldItalicUnderlineToggles />
      <InsertImage />
      <div>
        <CreateLink />
      </div>
    </div>
  );
};
