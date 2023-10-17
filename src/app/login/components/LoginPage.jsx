import {
  Box,
  GluestackUIProvider,
  Heading,
  HStack,
  Text,
  VStack,
  Input,
  InputField,
  Button,
  ButtonText,
  InputSlot,
  InputIcon
} from "@gluestack-ui/themed";
import React from "react";
import { config } from "../../../../config/gluestack-ui.config";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "/public/loginpc.jpg"

const Loginpage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    if (email === "bigya" && password === "123") {
      router.push("/");
    } else {
      alert("Wrong email or password");
      setEmail("");
      setPassword("");
      return;
    }
  };

  // const handleInput=(e)=>{
  //   console.log(e.target.value)
  //   console.log(e.target.name)
  // }

  return (
    <>
      <GluestackUIProvider config={config}>
        <Box bg="$clr3" h="740px" justifyContent="center" alignItems="center">
          <Box h="55%" w="50%" rounded="5px">
            <HStack>
              <Box bg="$clr2" h="100%" width="50%" aligntext="center">
                <Box pt="36px">
                  <Heading mr="auto" ml="auto">
                    Welcome
                  </Heading>
                </Box>
                <Box>
                  <Box
                    bg="$clr2"
                    borderWidth="0.5px"
                    m="5px"
                    borderColor=""
                    borderRadius="$md"
                    p="36px"
                    mr="auto"
                    ml="auto"
                    mb="20px"
                  >
                    <VStack
                      p="5px"
                      space="4xl"
                      pb="25px"
                      mb="-10px"
                      pr="auto"
                      pl="auto"
                    >
                      <VStack>
                        <Text bold={true}>Email</Text>
                        <Input
                          variant="outline"
                          size="md"
                          isDisabled={false}
                          isInvalid={false}
                          isReadOnly={false}
                        >
                          <InputField
                            placeholder="Type your email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email ? email : ""}
                          />
                        </Input>
                      </VStack>
                      <VStack>
                        <Text bold={true}>Password</Text>
                        <Input variant="outline" size="md">
                          <InputField
                            placeholder="Type your password"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password ? password : ""}
                          />
                          <InputSlot onPress={handlePasswordState}>
                            <InputIcon
                              as={showPassword ? AiFillEye : AiFillEyeInvisible}
                            />
                          </InputSlot>
                        </Input>
                      </VStack>
                      <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        textAlign="center"
                        onPress={handleAuth}
                      >
                        <ButtonText>Login </ButtonText>
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              </Box>
              <Box bg="$white" h="100%" width="50%">
                <Image src={logo} alt="pc" fill objectFit="contain" />
              </Box>
            </HStack>
          </Box>
        </Box>
      </GluestackUIProvider>
    </>
  );
};

export default Loginpage;
