"use client";

import { Heading, Center, VStack, HStack, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import Headerbar from "./components/header";
import Scrollable from "./components/scrollable";
//dummy
import { news, tasks, dummyinfo, yourProjects } from "../testdata/data";

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <>
      <Headerbar />
      <Center>
        <Heading size="3xl">Hello, {dummyinfo.name}</Heading>
      </Center>

      <HStack>
        <Scrollable
          title="Your Projects"
          list={yourProjects}
          sWidth={"25rem"}
          route="/projectdash"
        />
        <VStack>
          <Scrollable title="News and Notices" list={news} />
          <Scrollable title="Your Tasks" list={tasks} task={true} />
        </VStack>
      </HStack>
    </>
  );
};

export default Dashboard;
