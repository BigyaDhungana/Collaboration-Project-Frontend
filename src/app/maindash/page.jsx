"use client";

import { Heading, Center, VStack, HStack, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import Headerbar from "./components/header";
import Scrollable from "./components/scrollable";
import Stable from "./components/scrolltable";
import { useUserContext } from "../../context/userContext";
import { useLocalData } from "../../hooks/useLocalData";
import { dashboardApi } from "../../apiFunc/dashboard";
import {metadataApi} from "../../apiFunc/users"
import { savetoLocalStorage } from "../../utils/localstorage";

//dummy
import { news, tasks, dummyinfo, yourProjects, nws } from "../testdata/data";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { authToken, userDetails, isMounted } = useLocalData();

  const dashResponse = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardApi(authToken),
    enabled: isMounted,
  });

  const metadataResponse = useQuery({
    queryKey:["metadata"],
    queryFn:()=>metadataApi(authToken),
    enabled:isMounted,})

  if(metadataResponse.data){
    savetoLocalStorage("metadata",metadataResponse.data)
  }

  if (!isMounted) {
    return;
  }
  if (dashResponse.isLoading||metadataResponse.isLoading) {
    return <h1>loading</h1>;
  }
  if (dashResponse.isError||metadataResponse.isError) {
    return <h1>err</h1>;
  }
  // console.log(metadataResponse.data)
  return (
    <>
      <Headerbar />
      <Center>
        <Heading size="3xl">Hello, {userDetails?.name}</Heading>
      </Center>

      <HStack>
        <Scrollable
          title="Your Projects"
          list={metadataResponse.data}
          sWidth={"25rem"}
          route="/projectdash"
        />
        <VStack>
          <Scrollable
            title="Announcements"
            list={dashResponse.data.announcements}
          />
          <Stable todosList={dashResponse.data.todos}></Stable>
        </VStack>
      </HStack>
    </>
  );
};

export default Dashboard;
