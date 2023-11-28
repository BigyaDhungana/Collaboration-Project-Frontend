"use client";
import { use, useEffect, useState } from "react";
import ProjectHeader from "./components/projectHeader";
import VNavbar from "./components/vNavbar";
import { useSearchParams } from "next/navigation";
import Headerbar from "../maindash/components/header";
import {
  VStack,
  HStack,
  GluestackUIProvider,
  Center,
  Switch,
  get,
} from "@gluestack-ui/themed";
import { config } from "../../../config/gluestack-ui.config";
import Scrollbox from "./components/scrollbox";
import { todos } from "../testdata/data";
import Task from "./components/task";
import { LuListTodo } from "react-icons/lu";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useLocalData } from "../../hooks/useLocalData";
import { useQuery } from "@tanstack/react-query";
import { getTodoListApi } from "../../apiFunc/todos";
import { MdGroups2 } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const ProjectDash = () => {
  //get query param
  const searchParam = useSearchParams();
  const pId = searchParam.get("pid");
  // console.log(pId);
  const { authToken, isMounted, metaData, userDetails } = useLocalData();

  const [sTeamId, setSTeamId] = useState(null);
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgres] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [reload, setReload] = useState(false);
  const [isUserOnly, setIsUserOnly] = useState(false);

  const getTodoListResponse = useQuery({
    queryKey: ["gettodo", { team: sTeamId }, reload],
    queryFn: () => getTodoListApi(authToken, { team: sTeamId }),
    enabled: sTeamId != null,
  });

  //get data form component
  const getProjTeamdata = (teamId) => {
    if (teamId != null) {
      setSTeamId(teamId);
    }
    return;
  };

  useEffect(() => {}, [sTeamId]);

  useEffect(() => {
    if (getTodoListResponse.data != null && isUserOnly === false) {
      setTodos(
        getTodoListResponse.data.filter((listObj) => listObj.status === "TODO")
      );
      setInProgres(
        getTodoListResponse.data.filter(
          (listObj) => listObj.status === "PROGRESS"
        )
      );
      setCompleted(
        getTodoListResponse.data.filter(
          (listObj) => listObj.status === "COMPLETE"
        )
      );
    }
    if (getTodoListResponse.data != null && isUserOnly === true) {
      setTodos(
        getTodoListResponse.data.filter(
          (listObj) =>
            listObj.status === "TODO" &&
            listObj.assigned_to == userDetails.username
        )
      );
      setInProgres(
        getTodoListResponse.data.filter(
          (listObj) =>
            listObj.status === "PROGRESS" &&
            listObj.assigned_to == userDetails.username
        )
      );
      setCompleted(
        getTodoListResponse.data.filter(
          (listObj) =>
            listObj.status === "COMPLETE" &&
            listObj.assigned_to == userDetails.username
        )
      );
    }
  }, [getTodoListResponse.data, isUserOnly]);

  console.log(isUserOnly);

  if (!isMounted) return;

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
            <Center>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdGroups2 size={30} />{" "}
                <Switch
                  value={isUserOnly}
                  onToggle={() => {
                    setIsUserOnly(!isUserOnly);
                  }}
                />
                <FaUserAlt />
              </div>
            </Center>
            <HStack>
              <Scrollbox
                title={"TODO"}
                list={todos}
                refetchFunc={getTodoListResponse}
                reload={reload}
                setReload={setReload}
                teamId={sTeamId}
              >
                <LuListTodo />
              </Scrollbox>
              <Scrollbox
                title={"In Progress"}
                list={inProgress}
                refetchFunc={getTodoListResponse}
                reload={reload}
                setReload={setReload}
                teamId={sTeamId}
              >
                <TbProgress />
              </Scrollbox>
              <Scrollbox
                title={"Completed"}
                list={completed}
                refetchFunc={getTodoListResponse}
                reload={reload}
                setReload={setReload}
                teamId={sTeamId}
              >
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
