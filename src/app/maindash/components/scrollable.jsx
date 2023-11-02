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
} from "@gluestack-ui/themed";
import { useState } from "react";

const Scrollable = ({ title, list, sWidth = "61.25rem", route = "none" }) => {
  const router = useRouter();

  const [showNews, setShowNews] = useState(false);
  const [news, setNews] = useState({ title: "", content: "" });

  const queryParamGenerator = (key, value) => {
    const params = new URLSearchParams();
    params.set(key, value);
    return params.toString();
  };

  const handleButton = (elementName) => {
    if (route != "none") {
      router.push(route + "?" + queryParamGenerator("pname", elementName));
    } else {
      console.log(`not defined for news and notices btw ${elementName}`);
      setShowNews(true);
      setNews({
        title: elementName,
        content:
          "naam bataiya :Bhupendra Jogi jdsklajfkldsjafkljdsklfjsdkaljfkldsajfkljdsklfjasdkljfkldsjfkljasdklfjsdkljfklajsdfkljadsfkljsdklajfklsdjafkljsdkljfkldsjafkljdsakljflkdsajfkljasdlkfjldksjfkljsdklfjsdkljflkjdsfjksdljflkdsjfkjsdkljfklsdjfkldsjflkjdsfljdslkfjdklsjfkldsjflkjsdlkfjdsljfl khass ma yo fetch garnu parne ho\nkl;sakdl;skadl",
      });
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <Box borderWidth="0.5px" ml="5px" mr="5px" mt="30px" p="5px">
        <Center>
          <Heading mb="5px">{title}</Heading>
        </Center>

        <ScrollView h="220px" w={sWidth}>
          {list.map((element, index) => {
            return (
              <Button
                mb="2px"
                key={index}
                variant="link"
                onPress={() => {
                  handleButton(element);
                }}
              >
                <ButtonText> {element}</ButtonText>
              </Button>
            );
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
