"use client";

import { Heading, Center, VStack, HStack, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import Headerbar from "./components/header";
import Scrollable from "./components/scrollable";
import Stable from "./components/scrolltable";
import { useUserContext } from "../../context/userContext";
import { useLocalData } from "../../hooks/useLocalData";


//dummy
import { news, tasks, dummyinfo, yourProjects, nws } from "../testdata/data";

const Dashboard = () => {
  // const { authToken, userDetails } = useUserContext();
  // console.log(userDetails);
  const { authToken, userDetails } = useLocalData();
  return (
    <>
      <Headerbar />
      <Center>
        <Heading size="3xl">Hello, {userDetails?.name}</Heading>
      </Center>

      <HStack>
        <Scrollable
          title="Your Projects"
          list={yourProjects}
          sWidth={"25rem"}
          route="/projectdash"
        />
        <VStack>
          <Scrollable title="News and Notices" list={nws} />
          <Stable list={tasks}></Stable>
        </VStack>
      </HStack>
    </>
  );
};

export default Dashboard;
