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
} from "@gluestack-ui/themed";

const Scrollable = ({
  title,
  list,
  task = false,
  sWidth = "61.25rem",
  route = "none",
}) => {
  const router = useRouter();

  const queryParamGenerator = (key, value) => {
    const params = new URLSearchParams();
    params.set(key, value);
    return params.toString();
  };

  const handleButton = (elementName) => {
    if (route!="none"){
      router.push(route + "?" + queryParamGenerator("pname", elementName));
    }
    else {
      console.log(`not defined for news and notices btw ${elementName}`)
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
            if (task) {
              return (
                <Center key={index}>
                  <Text>{element}</Text>
                </Center>
              );
            } else {
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
            }
          })}
        </ScrollView>
      </Box>
    </GluestackUIProvider>
  );
};

export default Scrollable;
