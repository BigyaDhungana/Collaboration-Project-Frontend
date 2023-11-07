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

//test
const projList = ["ine", "teo", "three", "four", "five"];

const Createdoc = () => {
  const route = useRouter();
  const ref = useRef();
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: "Remove this and start writing 👍",
  });

  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");

  const handleSave = () => {
    const markdownOutput = ref.current?.getMarkdown();

    if (title == "" || markdownOutput == "" || project == "") {
      alert("Fill all the fields");
    } else {
      console.log(markdownOutput, title, project);
      alert("saved");
      route.push("/projectdash/documentation");
    }
  };

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
            setProject(e.target.value);
          }}
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
            markdown="remove this and start writing"
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
