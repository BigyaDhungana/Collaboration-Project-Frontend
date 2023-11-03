"use client";
import { useState, useEffect } from "react";
import VNavbar from "../../components/vNavbar";
import Headerbar from "../../../maindash/components/header";
import { config } from "../../../../../config/gluestack-ui.config";
import { GluestackUIProvider, VStack, HStack } from "@gluestack-ui/themed";

const Documentation = ({children}) => {
  //prevent ssr
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
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
