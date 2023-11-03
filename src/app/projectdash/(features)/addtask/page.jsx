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
} from "@gluestack-ui/themed";
import { config } from "../../../../../config/gluestack-ui.config";
import { RiAddFill } from "react-icons/ri";

const testlist = ["ine", "teo", "three", "four", "five"];
const testlists = ["ek", "dui", "teen", "char", "fach"];
const testlistss = ["eh", "aur", "sac", "che", "go"];

const Addtask = () => {

 const [details, setDetails] = useState({ taskTitle: "", taskDesc: "" });
const [selectDetails,setSelectdetails]=useState({teamName:"",empName:"",projectName:""})
  //prevent ssr
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;
  
 

  const handleAddtask=()=>{
    console.log(details,selectDetails)
  }

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
                        onChange={(e) =>
                          setSelectdetails({
                            ...selectDetails,
                            projectName: e.target.value,
                          })
                        }
                        defaultValue="none"
                      >
                        <option value="none" disabled hidden>
                          Select an Option
                        </option>
                        {testlist.map((element, index) => {
                          return (
                            <option value={element} key={index}>
                              {element}
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
                          onChange={(e) =>
                            setSelectdetails({
                              ...selectDetails,
                              empName: e.target.value,
                            })
                          }
                          defaultValue="none"
                        >
                          <option value="none" disabled hidden>
                            Select an Option
                          </option>
                          {testlists.map((element, index) => {
                            return (
                              <option value={element} key={index}>
                                {element}
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
                          onChange={(e) =>
                            setSelectdetails({
                              ...selectDetails,
                              teamName: e.target.value,
                            })
                          }
                          defaultValue="none"
                        >
                          <option value="none" disabled hidden>
                            Select an Option
                          </option>
                          {testlistss.map((element, index) => {
                            return (
                              <option value={element} key={index}>
                                {element}
                              </option>
                            );
                          })}
                        </select>
                      </VStack>
                    </HStack>
                    <Button onPress={handleAddtask}>
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
