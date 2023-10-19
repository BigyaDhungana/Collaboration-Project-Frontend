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
} from "@gluestack-ui/themed";
import { config } from "../../../../config/gluestack-ui.config";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const [profileClicked, setProfileClicked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const route = useRouter();

  const dummyinfo = {
    name: "Bigya Dhungana",
    role: "Project Manager",
    created: "2023/02/02",
  };

  const handleLogout = () => {
    route.push("/login");
  };

  // const test = () => {
  //   console.log("kl");
  // };

  return (
    <GluestackUIProvider config={config}>
      <HStack space="md">
        <Avatar bgColor="$amber600" size="md">
          <AvatarFallbackText color="$white">
            {dummyinfo.name}
          </AvatarFallbackText>
          <AvatarBadge></AvatarBadge>
          {/* <Icon as={RxAvatar}></Icon> */}
        </Avatar>
        <VStack>
          <Text bold>{dummyinfo.name}</Text>
          <Text size="sm">{dummyinfo.role}</Text>
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
            <VStack space="xl">
              <HStack>
                <Text>Your Name :</Text>
                <Text> {dummyinfo.name}</Text>
              </HStack>
              <HStack>
                <Text>Your Role :</Text>
                <Text> {dummyinfo.role} </Text>
              </HStack>
              <HStack>
                <Text>Created Date :</Text>
                <Text> {dummyinfo.created}</Text>
              </HStack>
            </VStack>
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
