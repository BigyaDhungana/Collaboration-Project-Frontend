"use client";

import { Heading, Center, VStack, HStack, Box } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import Headerbar from "./components/header";
import Scrollable from "./components/scrollable";
import Stable from "./components/scrolltable";
import { useUserContext } from "../../context/userContext";
import { useLocalData } from "../../hooks/useLocalData";
import { dashboardApi } from "../../apiFunc/dashboard";
import { metadataApi } from "../../apiFunc/users";
import { savetoLocalStorage } from "../../utils/localstorage";
import Error from "../../components/error";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading";
import { useRouter } from "next/navigation";
import { showToast } from "../../utils/toasT";

const Dashboard = () => {
  const { authToken, userDetails, isMounted } = useLocalData();
  const router = useRouter();

  const dashResponse = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardApi(authToken),
    enabled: isMounted,
  });

  const metadataResponse = useQuery({
    queryKey: ["metadata"],
    queryFn: () => metadataApi(authToken),
    enabled: isMounted,
  });

  if (metadataResponse.data) {
    savetoLocalStorage("metadata", metadataResponse.data);
  }

  if (isMounted == true && authToken == null) {
    showToast("user token expired", "error");
    router.replace("/");
    return <Loading text={"Please wait ..."} size={"large"} />;
  }

  if (!isMounted) {
    return <Loading text={"Loading page ..."} size={"large"} />;
  }
  if (dashResponse.isLoading || metadataResponse.isLoading) {
    return <Loading text={"Please wait ..."} size={"large"} />;
  }
  if (dashResponse.isError) {
    if (dashResponse.error.message == "401") {
      showToast("user token expired", "error");
      router.replace("/");
      return <Loading text={"Please wait ..."} size={"large"} />;
    }
    return <Error status={dashResponse.error.message} />;
  }

  if (metadataResponse.isError) {
    if (dashResponse.error.message == "401") {
      showToast("user token expired", "error");
      router.push("/");
      return <Loading text={"Please wait ..."} size={"large"} />;
    }
    return <Error status={dashResponse.error.message} />;
  }

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
          sWidth={"24rem"}
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
