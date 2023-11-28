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
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Center,
  ButtonIcon,
} from "@gluestack-ui/themed";
import React from "react";
import { config } from "../../../../config/gluestack-ui.config";
import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillFileImage,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import logo from "/public/loginpc.jpg";
import { useMutation } from "@tanstack/react-query";
import { signupApi, loginApi } from "../../../apiFunc/users";
import { showToast } from "../../../utils/toasT";
import { savetoLocalStorage } from "../../../utils/localstorage";
import Loading from "../../../components/loading";
import "../css/login.css";

const Loginpage = () => {
  const router = useRouter();

  //eye eycon haha
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupInfo, setSignupinfo] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
  });
  const [pppicture, setPppicture] = useState(undefined);
  const [showSignup, setShowSignup] = useState(false);

  //api call
  const signupResponse = useMutation({
    mutationFn: (signupFormData) => signupApi(signupFormData),
    onError: (error) => {
      showToast(error.message, "error");
      setSignupinfo({ ...signupInfo, username: "", password: "" });
    },
    onSuccess: () => {
      setShowSignup(false);
      showToast("Sign Up successful", "success");
      setPppicture(undefined);
      setSignupinfo({
        fname: "",
        lname: "",
        email: "",
        username: "",
        password: "",
      });
    },
  });
  const loginResponse = useMutation({
    mutationFn: (loginData) => loginApi(loginData),
    onError: (error) => {
      showToast(error.response.data.error || error.message, "error");
      setUsername("");
      setPassword("");
    },

    onSuccess: (data) => {
      // console.log(data.data);
      const { username, token, profile_picture, userID, name, email } =
        data.data;
      savetoLocalStorage("authToken", token);
      savetoLocalStorage("userDetails", {
        username,
        profile_picture,
        userID,
        name,
        email,
      });
      showToast(`Welcome ${username}`, "success");
      router.push("/maindash");
    },
    networkMode: "always",
  });

  const handleAuth = () => {
    if (!(userName && password)) {
      showToast("Fill all the field", "error");
    } else {
      loginResponse.mutate({ username: userName, password });
    }
  };

  const handleSignup = () => {
    if (
      signupInfo.fname == "" ||
      signupInfo.lname == "" ||
      signupInfo.email == "" ||
      signupInfo.username == "" ||
      signupInfo.password == "" ||
      pppicture === undefined
    ) {
      showToast("fill all the fields", "error");
    } else {
      const ext = pppicture.name.split(".").pop();
      if (ext !== "jpg" && ext !== "jpeg" && ext !== "png") {
        showToast("Only jpg/jpeg and png files are allowed", "error");
        return;
      }
      const signupFormData = new FormData();
      signupFormData.append("username", signupInfo.username);
      signupFormData.append("password", signupInfo.password);
      signupFormData.append("profile_pic", pppicture);
      signupFormData.append("first_name", signupInfo.fname);
      signupFormData.append("last_name", signupInfo.lname);
      signupFormData.append("email", signupInfo.email);
      signupResponse.mutate(signupFormData);
      // console.log(signupResponse.data);
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
                            onChange={(e) => setUsername(e.target.value)}
                            value={userName ? userName : ""}
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
                        isDisabled={loginResponse.isPending}
                      >
                        <ButtonText>
                          {loginResponse.isPending ? (
                            <AiOutlineLoading3Quarters className="loading" />
                          ) : (
                            <>Login</>
                          )}
                        </ButtonText>
                      </Button>
                      <Divider />
                      <Button
                        size="md"
                        varient="solid"
                        action="positive"
                        textAlign="center"
                        onPress={() => setShowSignup(true)}
                        isDisabled={loginResponse.isPending}
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
            setPppicture(undefined);
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
                      value={signupInfo.username ? signupInfo.username : ""}
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
                      value={signupInfo.password ? signupInfo.password : ""}
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
                      <FiUpload /> {"Click here to upload profile picture . "}
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
                    w="100px"
                    isDisabled={signupResponse.isPending}
                  >
                    <ButtonText>Cancel</ButtonText>
                  </Button>
                  <Button
                    size="md"
                    varient="solid"
                    action="positive"
                    textAlign="center"
                    onPress={handleSignup}
                    w="100px"
                    isDisabled={signupResponse.isPending}
                  >
                    <ButtonText>
                      {signupResponse.isPending ? (
                        <AiOutlineLoading3Quarters className="loading" />
                      ) : (
                        <>Sign Up</>
                      )}
                    </ButtonText>
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

// const showToast = (message, type) => {
//   toast[type](message, {
//     position: "top-left",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//   });
// };
