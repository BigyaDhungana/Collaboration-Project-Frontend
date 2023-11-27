import { useRouter } from "next/navigation";
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
  Button,
  ButtonText,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  HStack,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { queryParamGenerator } from "../../../utils/querypara";

const Scrollable = ({ title, list, sWidth = "61.25rem", route = "none" }) => {
  const router = useRouter();

  const [showNews, setShowNews] = useState(false);
  const [news, setNews] = useState({ title: "", content: "" });

  // const queryParamGenerator = (key, value) => {
  //   const params = new URLSearchParams();
  //   params.set(key, value);
  //   return params.toString();
  // };

  const handleButton = (elementName, title = undefined, body = undefined) => {
    if (route != "none") {
      router.push(route + "?" + queryParamGenerator("pid", elementName));
    } else {
      // console.log(`not defined for news and notices btw ${elementName}`);
      setShowNews(true);
      setNews({
        title: title,
        content: body,
      });
    }
  };
  // console.log(list);
  return (
    <GluestackUIProvider config={config}>
      <Box borderWidth="0.5px" ml="5px" mr="5px" mt="30px" p="5px">
        <Center>
          <Heading mb="5px">{title}</Heading>
        </Center>

        <ScrollView h="220px" w={sWidth}>
          {list.map((element) => {
            if (title == "Your Projects") {
              return (
                <Button
                  mb="2px"
                  key={element.project_id}
                  variant="link"
                  onPress={() => {
                    handleButton(element.project_id);
                  }}
                >
                  <ButtonText> {element.project_name}</ButtonText>
                </Button>
              );
            } else {
              return (
                <table key={element.id}>
                  <tbody>
                    <tr>
                      <td style={{ width: "33%", textAlign: "center" }}>
                        <Button
                          mb="2px"
                          variant="link"
                          // onPress={() => {
                          //   handleButton(element.title);
                          // }}
                          isDisabled={true}
                          w="60%"
                          sx={{
                            ":disabled": {
                              opacity: 1,
                            },
                          }}
                          action="secondary"
                        >
                          <ButtonText> {element.project} :</ButtonText>
                        </Button>
                      </td>
                      <td style={{ width: "33%", textAlign: "center" }}>
                        <Button
                          mb="2px"
                          variant="link"
                          onPress={() => {
                            handleButton(
                              element.id,
                              element.title,
                              element.body
                            );
                          }}
                        >
                          <ButtonText>{element.title}</ButtonText>
                        </Button>
                      </td>
                      <td style={{ width: "20%", textAlign: "center" }}>
                        <Button
                          mb="2px"
                          variant="link"
                          isDisabled={true}
                          w="60%"
                          sx={{
                            ":disabled": {
                              opacity: 1,
                            },
                          }}
                          action="secondary"
                        >
                          <ButtonText>
                            {element.created_at.slice(0, 10)}{" "}
                          </ButtonText>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            }
          })}
        </ScrollView>
      </Box>

      {/* news model */}

      <Modal isOpen={showNews} onClose={() => setShowNews(false)} size="lg">
        <ModalContent>
          <Center>
            <ModalHeader>
              <Heading>{news.title}</Heading>
            </ModalHeader>
          </Center>
          <ModalBody>
            <Text>{news.content}</Text>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button
                variant="solid"
                action="negative"
                onPress={() => {
                  setShowNews(false);
                }}
              >
                <ButtonText>Close</ButtonText>
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>
    </GluestackUIProvider>
  );
};

export default Scrollable;

//width of button
