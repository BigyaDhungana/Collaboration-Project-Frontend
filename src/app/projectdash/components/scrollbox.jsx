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
import { todos } from "../../testdata/data";
import Task from "./task";


const Scrollbox = ({ title,children }) => {
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
          {todos.map((todo, index) => {
            return (
              <Task key={index} task={todo} taskType={title}>
                {todo}
              </Task>
            );
          })}
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default Scrollbox;
