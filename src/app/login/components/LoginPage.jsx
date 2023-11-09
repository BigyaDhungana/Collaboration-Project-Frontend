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
  InputIcon,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Center,
} from "@gluestack-ui/themed";
import React, { useId } from "react";
import { config } from "../../../../config/gluestack-ui.config";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillFileImage,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import logo from "/public/loginpc.jpg";
// import { useUserContext } from "../../../context/userContext";

const Loginpage = () => {
  const router = useRouter();

  //eye eycon haha
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupInfo, setSignupinfo] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
  });
  const [pppicture, setPppicture] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  // const { authKey, useAuthkey } = useUserContext();

  const handleAuth = () => {
    if (email === "bigya" && password === "123") {
      router.push("/maindash");
    } else {
      alert("Wrong email or password");
      setEmail("");
      setPassword("");

      return;
    }
  };

  const handleSignup = () => {
    if (
      signupInfo.fname == "" ||
      signupInfo.lname == "" ||
      signupInfo.email == "" ||
      signupInfo.username == "" ||
      signupInfo.password == "" ||
      pppicture === null
    ) {
      alert("fill all the field");
    } else {
      alert("Sign up Complete");
      console.log(signupInfo);
      setShowSignup(false);
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
                        <Text bold={true}>Username</Text>
                        <Input
                          variant="outline"
                          size="md"
                          isDisabled={false}
                          isInvalid={false}
                          isReadOnly={false}
                        >
                          <InputField
                            placeholder="Enter your username"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email ? email : ""}
                            id="uname"
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
                            id="pass"
                          />
                          <InputSlot onPress={handlePasswordState}>
                            {showPassword ? (
                              <AiOutlineEye />
                            ) : (
                              <AiOutlineEyeInvisible />
                            )}
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
                      <Divider />
                      <Button
                        size="md"
                        varient="solid"
                        action="positive"
                        textAlign="center"
                        onPress={() => setShowSignup(true)}
                      >
                        <ButtonText>Sign Up</ButtonText>
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
        {/* Sign up */}
        <Modal
          isOpen={showSignup}
          onClose={() => {
            setShowSignup(false);
            setPppicture(null);
          }}
          size="lg"
        >
          {/* Signup */}
          <ModalContent>
            <Center>
              <ModalHeader>
                <Heading>Sign Up</Heading>
              </ModalHeader>
            </Center>
            <Divider m="15px"></Divider>
            <ModalBody>
              <VStack space="md">
                <HStack space="xl">
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      placeholder="First name"
                      type="text"
                      onChange={(e) =>
                        setSignupinfo({ ...signupInfo, fname: e.target.value })
                      }
                      id="fname"
                    />
                  </Input>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      placeholder="Last name"
                      type="text"
                      onChange={(e) =>
                        setSignupinfo({ ...signupInfo, lname: e.target.value })
                      }
                      id="lname"
                    />
                  </Input>
                </HStack>

                <Input
                  variant="outline"
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField
                    placeholder="Email"
                    type="text"
                    onChange={(e) =>
                      setSignupinfo({ ...signupInfo, email: e.target.value })
                    }
                    id="email"
                  />
                </Input>

                <HStack space="xl">
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      placeholder="Username"
                      type="text"
                      onChange={(e) =>
                        setSignupinfo({
                          ...signupInfo,
                          username: e.target.value,
                        })
                      }
                      id="uuname"
                    />
                  </Input>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                  >
                    <InputField
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) =>
                        setSignupinfo({
                          ...signupInfo,
                          password: e.target.value,
                        })
                      }
                      id="password"
                    />
                    <InputSlot onPress={handlePasswordState}>
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </InputSlot>
                  </Input>
                </HStack>
                <input
                  type="file"
                  id="ppp"
                  onChange={(e) => {
                    setPppicture(e.target.files[0]);
                  }}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="ppp"
                  style={{
                    borderWidth: "0.3px",
                    borderColor: "black",
                    borderStyle: "dashed",
                    width: "fit-content",
                    padding: "2px",
                  }}
                >
                  {pppicture ? (
                    <>
                      <AiFillFileImage />
                      {pppicture.name}
                    </>
                  ) : (
                    <>
                      <FiUpload /> "Click here to upload profile picture . "
                    </>
                  )}
                </label>
                <Text size="2xs">
                  By clicking Sign Up, you agree to our Terms, Privacy Policy
                  and Cookies Policy.
                </Text>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <VStack>
                <HStack space="3xl">
                  <Button
                    size="md"
                    varient="solid"
                    action="negative"
                    textAlign="center"
                    onPress={() => setShowSignup(false)}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button
                    size="md"
                    varient="solid"
                    action="positive"
                    textAlign="center"
                    onPress={handleSignup}
                  >
                    <ButtonText>Sign Up</ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </GluestackUIProvider>
    </>
  );
};

export default Loginpage;
