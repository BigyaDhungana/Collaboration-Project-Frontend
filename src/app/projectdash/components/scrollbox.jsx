import {
  Box,
  GluestackUIProvider,
  Text,
  Center,
  Heading,
  ScrollView,
} from "@gluestack-ui/themed";
import { config } from "../../../../config/gluestack-ui.config";
import { todos } from "../../testdata/data";

const Scrollbox = ({title}) => {
  return (
    <GluestackUIProvider config={config}>
      <Box borderWidth="0.5px" m="15px" p="5px" w="330px" >
        <Center mt="10px" mb="15px">
          <Heading>{title}</Heading>
        </Center>
        <ScrollView  h="450px" p="10px">
          {
              todos.map((todo,index)=>{
               return (
                 
                   <Text key={index}>{todo}</Text>
                 
               );
              })
              }
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default Scrollbox;
