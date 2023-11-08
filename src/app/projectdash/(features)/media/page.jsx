"use client";
import React, { useState, useEffect } from "react";
import Mediadiv from "./components/Mediadiv";
import "../../css/features.css";
import {
  GluestackUIProvider,
  HStack,
  VStack,
  Box,
  Center,
  Heading,
  Text,
  ScrollView,
  Divider,
  ButtonText,
  Button,
} from "@gluestack-ui/themed";
import { config } from "../../../../../config/gluestack-ui.config";
import Headerbar from "../../../maindash/components/header";
import VNavbar from "../../components/vNavbar";
import { FiUpload } from "react-icons/fi";
import { AiFillFileImage } from "react-icons/ai";

const projectList = ["help", "I", "have", "lost", "my mind"];

const Media = () => {
  const [file, setFile] = useState(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;

  // const response = await fetch(
  //   "https://mocki.io/v1/4fecdb75-6ae1-4259-8b0b-47b60e037e21",
  //   { cache: "no-cache" }
  // );
  // const data = await response.json();
  // console.log(data);

  const handleSelectChange = (e) => {
    console.log(e.target.value);
  };

  const handleUpload = () => {
    if (!file) {
      alert("select a image");
      return;
    }

    const ext = file.name.split(".").pop();
    alert(ext);

    console.log("chalyo");

    // const formData=FormData();
    // formData.append("file",file)
  };

  return (
    <GluestackUIProvider config={config}>
      <VStack space="4xl" pl="3px">
        <Headerbar />
        <HStack space="4xl">
          <VNavbar />
          <Box width="74%">
            <Center>
              <Heading size="2xl">Media</Heading>
            </Center>
            <Box borderWidth="0.5px" p="10px">
              <div className="mediaHeader">
                <VStack>
                  <Text>Select a project</Text>
                  <select
                    name="projectName"
                    id="pname"
                    className="selectlist smedia"
                    defaultValue="none"
                    onChange={handleSelectChange}
                  >
                    <option value="none" disabled hidden>
                      Select an Option
                    </option>
                    {projectList.map((element, index) => {
                      return (
                        <option value={element} key={index}>
                          {element}
                        </option>
                      );
                    })}
                  </select>
                </VStack>

                <VStack>
                  <Text>Upload an image</Text>
                  <HStack>
                    <label htmlFor="file-upload" className="fileUpload">
                      {file ? (
                        <>
                          <AiFillFileImage />
                          {file.name}
                        </>
                      ) : (
                        <>
                          <FiUpload /> "Click here to upload image"
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                    <Button size="xs" onPress={handleUpload}>
                      <ButtonText>Upload</ButtonText>
                    </Button>
                  </HStack>
                </VStack>
              </div>
              <Divider m="5px"></Divider>
              <ScrollView h="500px">
                <div className="media">
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                  <Mediadiv />
                </div>
              </ScrollView>
            </Box>
          </Box>
        </HStack>
      </VStack>
    </GluestackUIProvider>
  );
};

export default Media;
