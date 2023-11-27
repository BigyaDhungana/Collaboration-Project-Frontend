"use client";
import { useState, useEffect } from "react";
import VNavbar from "../../components/vNavbar";
import Headerbar from "../../../maindash/components/header";
import "../../css/features.css";
import {
  Box,
  Center,
  Divider,
  GluestackUIProvider,
  Heading,
  Input,
  InputField,
  Text,
  Textarea,
  TextareaInput,
  VStack,
  HStack,
  Button,
  ButtonText,
  ButtonIcon,
  set,
  get,
} from "@gluestack-ui/themed";
import { config } from "../../../../../config/gluestack-ui.config";
import { RiAddFill } from "react-icons/ri";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "../../../../utils/toasT";
import { addTodoApi } from "../../../../apiFunc/todos";
import { useLocalData } from "../../../../hooks/useLocalData";
import { getTeamMembersApi } from "../../../../apiFunc/teammembers";

// const projectList = ["Bhiutii", "Sadak Vision", "khai k view"];
// const employeesList = ["Ram", "Shyam", "Hari", "Krishna"];
// const teamList = ["eh", "aur", "sac", "che", "go"];

const taskPriorities = [
  { prId: 0, prName: "Can skip" },
  { prId: 1, prName: "Not so Urgent" },
  { prId: 2, prName: "Urgent" },
];

const Addtask = () => {
  const [details, setDetails] = useState({ taskTitle: "", taskDesc: "" });
  const [selectDetails, setSelectdetails] = useState({
    teamId: "",
    empName: "",
    projectId: "",
    taskPriority: 0,
  });

  const { authToken, isMounted, metaData } = useLocalData();
  const [teams, setTeams] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const [defTeamValue, setdefTeamValue] = useState("none");
  const [employeeList, setEmployeeList] = useState([]);
  const [empValue, setEmpValue] = useState("none");

  const getTeamMembersResponse = useQuery({
    queryKey: ["teammembers", { team: Number(selectDetails.teamId) }],
    queryFn: () => getTeamMembersApi(authToken, { team: selectDetails.teamId }),
    enabled: defTeamValue !== "none",
  });

  useEffect(() => {
    if (isMounted == true && selectDetails.projectId !== "") {
      const teamList = metaData.find(
        (projectObj) => projectObj.project_id == selectDetails.projectId
      ).teams;
      setTeams(teamList);
    }
  }, [selectDetails.projectId]);

  useEffect(() => {
    if (getTeamMembersResponse.data) {
      setEmployeeList(getTeamMembersResponse.data);
    }
  }, [getTeamMembersResponse.data]);

  const addtaskResponse = useMutation({
    mutationFn: (data) => addTodoApi(authToken, data),
    onSuccess: () => {
      showToast("Task Added Successfully", "success");
      setSelectdetails({
        teamId: "",
        empName: "",
        projectId: "",
        taskPriority: 0,
      });
      setDetails({ taskTitle: "", taskDesc: "" });
      setdefTeamValue("none");
      setEmpValue("none");
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const handleAddtask = () => {
    const data = {
      team: Number(selectDetails.teamId),
      title: details.taskTitle,
      body: details.taskDesc,
      status: 0,
      priority: Number(selectDetails.taskPriority),
      assigned_to: selectDetails.empName,
    };
    // console.log(data);
    addtaskResponse.mutate(data);
  };

  if (!isMounted) return;

  return (
    <>
      <GluestackUIProvider config={config}>
        <VStack space="4xl" pl="3px">
          <Headerbar />
          <HStack space="4xl">
            <VNavbar />

            <Box width="70%">
              <Center>
                <Box borderWidth="0.5px" width="60%" p="10px">
                  <Center>
                    <Heading>Add Task</Heading>
                  </Center>
                  <Divider m="5px" />
                  <VStack space="3xl" mt="10px">
                    <Input size="lg">
                      <InputField
                        placeholder="Enter Task Title"
                        onChange={(e) =>
                          setDetails({ ...details, taskTitle: e.target.value })
                        }
                      ></InputField>
                    </Input>
                    <Textarea isRequired size="lg" h="250px">
                      <TextareaInput
                        placeholder="Enter Task Description Here"
                        onChange={(e) =>
                          setDetails({ ...details, taskDesc: e.target.value })
                        }
                      ></TextareaInput>
                    </Textarea>
                    <VStack>
                      <Text size="lg">Project Name</Text>
                      <select
                        name="projectName"
                        id="pname"
                        className="selectlist"
                        onChange={(e) => {
                          setSelectdetails({
                            ...selectDetails,
                            projectId: e.target.value,
                          });
                          setdefTeamValue("none");
                          setEmpValue("none");
                        }}
                        defaultValue="none"
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
                    <HStack space="4xl">
                      <VStack>
                        <Text size="lg">Employee Name</Text>
                        <select
                          name="employeeName"
                          id="ename"
                          className="selectlist"
                          onChange={(e) => {
                            setSelectdetails({
                              ...selectDetails,
                              empName: e.target.value,
                            });
                            setEmpValue(e.target.value);
                          }}
                          value={empValue}
                        >
                          <option value="none" disabled hidden>
                            Select an Option
                          </option>
                          {employeeList.map((empObj) => {
                            return (
                              <option value={empObj.name} key={empObj.id}>
                                {empObj.username}
                              </option>
                            );
                          })}
                        </select>
                      </VStack>
                      <VStack>
                        <Text size="lg">Team Name</Text>
                        <select
                          name="teamName"
                          id="tname"
                          className="selectlist"
                          onChange={(e) => {
                            setSelectdetails({
                              ...selectDetails,
                              teamId: e.target.value,
                            });
                            setdefTeamValue(e.target.value);
                            setEmpValue("none");
                          }}
                          value={defTeamValue}
                        >
                          <option value="none" disabled hidden>
                            Select an Option
                          </option>
                          {teams.map((element) => {
                            return (
                              <option
                                value={element.id}
                                key={element.id}
                                disabled={!element.isLead}
                              >
                                {element.name}
                              </option>
                            );
                          })}
                        </select>
                      </VStack>
                      <VStack>
                        <Text size="lg">Task Priority</Text>
                        <select
                          name="taskProirity"
                          id="tPriority"
                          className="selectlist"
                          onChange={(e) =>
                            setSelectdetails({
                              ...selectDetails,
                              taskPriority: e.target.value,
                            })
                          }
                          defaultValue="none"
                        >
                          <option value="none" disabled hidden>
                            Select an Option
                          </option>
                          {taskPriorities.map((element) => {
                            return (
                              <option value={element.prId} key={element.prId}>
                                {element.prName}
                              </option>
                            );
                          })}
                        </select>
                      </VStack>
                    </HStack>
                    <Button onPress={handleAddtask} isDisabled={buttonState}>
                      <ButtonText>Add Task</ButtonText>
                      <ButtonIcon>
                        <RiAddFill />
                      </ButtonIcon>
                    </Button>
                  </VStack>
                </Box>
              </Center>
            </Box>
          </HStack>
        </VStack>
      </GluestackUIProvider>
    </>
  );
};

export default Addtask;
