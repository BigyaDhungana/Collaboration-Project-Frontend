import {
  Box,
  GluestackUIProvider,
  Text,
  Center,
  Heading,
  ScrollView,
  Icon,
  HStack,
} from "@gluestack-ui/themed";
import { config } from "../../../../config/gluestack-ui.config";

import Task from "./task";

const Scrollbox = ({ title, children, list }) => {
  return (
    <GluestackUIProvider config={config}>
      <Box borderWidth="0.5px" m="15px" p="5px" w="380px" ml="5px">
        <Center mt="10px" mb="15px">
          <HStack space="lg">
            <Heading>{title}</Heading>
            <Heading>{children}</Heading>
          </HStack>
        </Center>
        <ScrollView h="450px" p="10px" pt="0px">
          {list.map((element) => {
            return (
              <Task key={element.id} task={element} taskType={title}></Task>
            );
          })}
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default Scrollbox;
