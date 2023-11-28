import {
  Button,
  ButtonText,
  GluestackUIProvider,
  Menu,
  MenuItem,
  MenuItemLabel,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarBadge,
  Text,
  VStack,
  ButtonIcon,
  Modal,
  Pressable,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  Center,
  ModalFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AvatarImage,
  Image,
} from "@gluestack-ui/themed";
import { config } from "../../../../config/gluestack-ui.config";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../../context/userContext";
//dummy
import { dummyinfo } from "../../testdata/data";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../../../apiFunc/users";
import { showToast } from "../../../utils/toasT";
import { useLocalData } from "../../../hooks/useLocalData";

const Profile = () => {
  // console.log(authToken)
  const router = useRouter();

  // const { authToken, setAuthtoken, userDetails, setUserDetails } =
  //   useUserContext();

  const { authToken, userDetails, isMounted } = useLocalData();
  const { email, name, profile_picture, userID, username } = userDetails;

  const logoutResponse = useMutation({
    mutationFn: () => {
      logoutApi(authToken);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
    onSuccess: () => {
      showToast("Logged out successfully", "success");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userDetails");
      router.push("/");
    },
  });

  const [profileClicked, setProfileClicked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const route = useRouter();

  const handleLogout = () => {
    logoutResponse.mutate();
  };
  if (!isMounted) return;

  return (
    <GluestackUIProvider config={config}>
      <HStack space="md">
        <Avatar bgColor="$amber600" size="md">
          <AvatarFallbackText color="$white">{username}</AvatarFallbackText>
          <AvatarBadge />
          <AvatarImage
            source={{
              uri: `${process.env.NEXT_PUBLIC_API_URL}${profile_picture}`,
            }}
          />
        </Avatar>
        <VStack>
          <Text bold>{username}</Text>
          <Text size="sm">{email}</Text>
        </VStack>

        <Menu
          offset={10}
          onOpen={() => {
            setProfileClicked(!profileClicked);
          }}
          onClose={() => {
            setProfileClicked(!profileClicked);
          }}
          placement="bottom end"
          selectionMode="single"
          onSelectionChange={(e) => {
            if (e.currentKey === "Your Information") {
              setShowInfo(true);
            }
            if (e.currentKey === "Logout") {
              setShowLogoutAlert(true);
            }
          }}
          trigger={({ ...triggerProps }) => {
            return (
              <Button {...triggerProps} variant="link" action="secondary">
                {profileClicked ? <AiFillCaretUp /> : <AiFillCaretDown />}
              </Button>
            );
          }}
        >
          <MenuItem key="Your Information" textValue="Your Information">
            <MenuItemLabel>Your Information</MenuItemLabel>
          </MenuItem>
          <MenuItem key="Logout" textValue="Logout">
            <MenuItemLabel>Logout</MenuItemLabel>
          </MenuItem>
        </Menu>

        {/* <Pressable onPress={() => setShowInfo(true)}>
          <Text>Your Information</Text>
        </Pressable> */}
      </HStack>

      {/* Your information */}
      <Modal isOpen={showInfo} onClose={() => setShowInfo(false)}>
        <ModalContent>
          <Center>
            <ModalHeader>
              <Heading>Your Information</Heading>
            </ModalHeader>
          </Center>
          <ModalBody>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <VStack space="xl">
                <HStack>
                  <Text>Name :</Text>
                  <Text> {name}</Text>
                </HStack>
                <HStack>
                  <Text>Email :</Text>
                  <Text> {email} </Text>
                </HStack>
                <HStack>
                  <Text>Username :</Text>
                  <Text> {username}</Text>
                </HStack>
                <HStack>
                  <Text>Id :</Text>
                  <Text> {userID}</Text>
                </HStack>
              </VStack>

              <Image
                size="xl"
                borderRadius="$full"
                source={{
                  uri: `${process.env.NEXT_PUBLIC_API_URL}${profile_picture}`,
                }}
              />
            </div>
          </ModalBody>
          <Center>
            <ModalFooter>
              <Button onPress={() => setShowInfo(false)}>
                <ButtonText>Close</ButtonText>
              </Button>
            </ModalFooter>
          </Center>
        </ModalContent>
      </Modal>

      {/* <Pressable
        onPress={() => {
          setShowLogoutAlert(true);
        }}
      >
        <Text>Logout</Text>
      </Pressable> */}

      {/* Logout Alert */}
      <AlertDialog
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
      >
        <AlertDialogContent>
          <Center>
            <AlertDialogHeader>
              <Heading>Logout</Heading>
            </AlertDialogHeader>
          </Center>
          <AlertDialogBody>
            <Text>Are you sure you want to logout ?</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack space="4xl">
              <Button
                variant="solid"
                action="secondary"
                onPress={() => {
                  setShowLogoutAlert(false);
                }}
              >
                <ButtonText>No</ButtonText>
              </Button>
              <Button action="negative" variant="solid" onPress={handleLogout}>
                <ButtonText>Yes</ButtonText>
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </GluestackUIProvider>
  );
};

export default Profile;
