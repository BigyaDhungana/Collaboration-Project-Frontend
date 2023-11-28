"use client";
import { useState, useEffect } from "react";
import VNavbar from "../../components/vNavbar";
import Headerbar from "../../../maindash/components/header";
import { config } from "../../../../../config/gluestack-ui.config";
import { GluestackUIProvider, VStack, HStack } from "@gluestack-ui/themed";
import { showToast } from "../../../../utils/toasT";
import { useLocalData } from "../../../../hooks/useLocalData";
import Loading from "../../../../components/loading";
import { useRouter } from "next/navigation";
const Documentation = ({ children }) => {
  const router = useRouter();
  const { authToken, userDetails, isMounted } = useLocalData();

  if (isMounted == true && authToken == null) {
    showToast("user token expired", "error");
    router.replace("/");
    return <Loading text={"Please wait ..."} size={"large"} />;
  }
  if (!isMounted) return;
  return (
    <>
      <GluestackUIProvider config={config}>
        <VStack space="4xl" pl="3px">
          <Headerbar />
          <HStack space="4xl">
            <VNavbar />
            {children}
          </HStack>
        </VStack>
      </GluestackUIProvider>
    </>
  );
};

export default Documentation;
