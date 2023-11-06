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
const ProjectDash = () => {
  //get query param
  const searchParam = useSearchParams();
  const pname = searchParam.get("pname");

  const [sProjectName, setSprojectName] = useState("");
  const [sTeamName, setSteamName] = useState("");

  //prevent ssr
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;

  //get data form component
  const getProjTeamdata = (projname, teamname) => {
    setSprojectName(projname);
    setSteamName(teamname);
  };

  console.log(`selected project name=${sProjectName} \t
  selected team name=${sTeamName}`);

  return (
    <>
      <VStack space="4xl" pl="3px">
        <Headerbar />
        <HStack space="4xl">
          <VNavbar />
          <VStack space="3xl">
            <Center>
              <ProjectHeader projectname={pname} func={getProjTeamdata} />
            </Center>
            <HStack>
              <Scrollbox title={"TODO"}><LuListTodo/></Scrollbox>
              <Scrollbox title={"In Progress"}><TbProgress/></Scrollbox>
              <Scrollbox title={"Completed"}><IoCheckmarkDoneCircleOutline/></Scrollbox>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default ProjectDash;
