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
import Loading from "../../../components/loading";

const Scrollbox = ({
  title,
  children,
  list,
  refetchFunc,
  reload,
  setReload,
  teamId,
}) => {
 
  return (
    <GluestackUIProvider config={config}>
      <Box borderWidth="0.5px" m="15px" p="5px" w="380px" ml="5px">
        <Center mt="10px" mb="15px">
          <HStack space="lg">
            <Heading>{title}</Heading>
            <Heading>{children}</Heading>
          </HStack>
        </Center>
        <ScrollView h="390px" p="10px" pt="0px">
          {refetchFunc.isLoading && <Loading size="small"/>}
          {list.map((element) => {
            return (
              <Task
                key={element.id}
                task={element}
                taskType={title}
                refetchFunc={refetchFunc}
                reload={reload}
                setReload={setReload}
                teamId={teamId}
              ></Task>
            );
          })}
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default Scrollbox;
