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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../../../utils/toasT";
import { useLocalData } from "../../../../hooks/useLocalData";
import { getMediaListApi, uploadMediaApi } from "../../../../apiFunc/media";
import { useRouter } from "next/navigation";
import Loading from "../../../../components/loading";

const projectList = ["help", "I", "have", "lost", "my mind"];

const Media = () => {
  const router = useRouter();
  const { authToken, isMounted, metaData } = useLocalData();

  const [file, setFile] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [dataArray, setDataArray] = useState([]);
  const [update, setUpdate] = useState(false);

  const getmedialistResponse = useQuery({
    queryKey: ["media", selectedProjectId, update],
    queryFn: () =>
      getMediaListApi(authToken, { project: Number(selectedProjectId) }),
    enabled: !!selectedProjectId,
  });

  const uploadmediaResponse = useMutation({
    mutationFn: (data) => {
      uploadMediaApi(authToken, data);
    },
    onSuccess: () => {
      showToast("Image added successfully", "success");
      setFile(null);
      setUpdate(!update);
      getmedialistResponse.refetch();
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const handleSelectChange = (e) => {
    setSelectedProjectId(e.target.value);
  };

  useEffect(() => {
    if (getmedialistResponse.data) {
      setDataArray(getmedialistResponse.data);
    }
  }, [getmedialistResponse.data]);

  useEffect(() => {}, [selectedProjectId]);

  // console.log(file);

  const handleUpload = () => {
    if (!file) {
      showToast("select a image", "error");
      return;
    }
    if (selectedProjectId === null) {
      showToast("select a project", "error");
      return;
    }

    const mediaFormData = new FormData();
    mediaFormData.append("project", selectedProjectId);
    mediaFormData.append("image", file);
    uploadmediaResponse.mutate(mediaFormData);
  };

  if (isMounted == true && authToken == null) {
    showToast("user token expired", "error");
    router.replace("/");
    return <Loading text={"Please wait ..."} size={"large"} />;
  }

  if (!isMounted) return;

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

                    {metaData.map((element) => {
                      return (
                        <option
                          value={element.project_id}
                          key={element.project_id}
                        >
                          {element.project_name}
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
                      accept=".png, .jpg, .jpeg"
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
                  {dataArray.map((imgObj) => {
                    return (
                      <Mediadiv
                        imgObj={imgObj}
                        key={imgObj.id}
                        func={setUpdate}
                        query={getmedialistResponse}
                        ivp={update}
                      />
                    );
                  })}
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
