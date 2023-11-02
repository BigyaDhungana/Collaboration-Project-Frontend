import {
  Center,
  GluestackUIProvider,
  Heading,
  ScrollView,
  Text,
  Box,
} from "@gluestack-ui/themed";
import { config } from "../../../../config/gluestack-ui.config";

import "../css/style.css"

const Stable = ({ list, sWidth = "61.25rem" }) => {
  return (
    <GluestackUIProvider config={config}>
      <Box borderWidth="0.5px" ml="5px" mr="5px" mt="15px" p="5px" mb="5px">
        <Center>
          <Heading mb="5px">Your Tasks</Heading>
        </Center>
        <table>
          <thead>
            <tr>
              <th className="tname">Task Name</th>
              <th className="project">Project</th>
              <th className="status">Status</th>
            </tr>
          </thead>
        </table>
        <ScrollView h="220px" w={sWidth}>
          <table>
            <tbody>
              {list.map((element, index) => {
                return (
                  <tr key={index}>
                    <td className="tname">
                      <Text>{element}</Text>
                    </td>
                    <td className="project">TODO</td>
                    <td className="status">tbd</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default Stable;
