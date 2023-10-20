import React from "react";
import { config } from "../../../../config/gluestack-ui.config";
import {
  GluestackUIProvider,
  Heading,
  Center,
  Box,
  Text,
  ScrollView,
  Link,
  LinkText,
} from "@gluestack-ui/themed";


const Scrollable = ({ title, list, task=false,sWidth="61.25rem" }) => {
    console.log(task)
  return (
    <GluestackUIProvider config={config}>
      <Box borderWidth="0.5px" ml="5px" mr="5px" mt="30px"  p="5px">
        <Center>
          <Heading mb="5px" >{title}</Heading>
        </Center>
        <ScrollView h="220px" w={sWidth} >
          {list.map((element, index) => {
            if (task){
                return (<Text key={index}>{element}</Text>);
            }
            else {
                return (
                  <Link mb="2px" key={index}>
                    <LinkText> {element}</LinkText>
                  </Link>
                );
            }
          })}
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default Scrollable;
