"use client";
import { useEffect, useState } from "react";
import ProjectHeader from "./components/projectHeader";
import VNavbar from "./components/vNavbar";
import { useSearchParams } from "next/navigation";
import Headerbar from "../maindash/components/header";
import {
  VStack,
  HStack,
  GluestackUIProvider,
  Center,
} from "@gluestack-ui/themed";
import { config } from "../../../config/gluestack-ui.config";
import Scrollbox from "./components/scrollbox";
import { todos } from "../testdata/data";
import Task from "./components/task";
import { LuListTodo } from "react-icons/lu";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useLocalData } from "../../hooks/useLocalData";
const ProjectDash = () => {
  //get query param
  const searchParam = useSearchParams();
  const pId = searchParam.get("pid");
  // console.log(pId);
  const { authToken, isMounted, metaData } = useLocalData();

  const [sProjectId, setSprojectId] = useState("");
  const [sTeamId, setSteamId] = useState("");

  //prevent ssr
  // const [isMounted, setIsMounted] = useState(false);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  if (!isMounted) return;

  //get data form component
  const getProjTeamdata = (projname, teamname) => {
    setSprojectId(projname);
    setSteamId(teamname);
  };

  console.log(`selected project name=${sProjectId} \t
  selected team name=${sTeamId}`);

  return (
    <>
      <VStack space="4xl" pl="3px">
        <Headerbar />
        <HStack space="4xl">
          <VNavbar />
          <VStack space="3xl">
            <Center>
              <ProjectHeader
                initialProjectId={pId}
                func={getProjTeamdata}
                metaDatalist={metaData}
              />
            </Center>
            <HStack>
              <Scrollbox title={"TODO"}>
                <LuListTodo />
              </Scrollbox>
              <Scrollbox title={"In Progress"}>
                <TbProgress />
              </Scrollbox>
              <Scrollbox title={"Completed"}>
                <IoCheckmarkDoneCircleOutline />
              </Scrollbox>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default ProjectDash;
