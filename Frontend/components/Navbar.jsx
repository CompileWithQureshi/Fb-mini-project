import React, { useState, useContext } from "react";
import { MdLogout } from "react-icons/md";
import {
  Button,
  useDisclosure,
  ModalOverlay,
  IconButton,
  Box,
} from "@chakra-ui/react";
import CreatePost from "../components/CreatePost"
import { AuthContext } from "../hooks/AuthContext";

function Navbar({ addNewPost }) {
  const { logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(null);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
  );

  const handleLogout = () => {
    logout();
  };

  const handleNewPost = (newPost) => {
    addNewPost(newPost); // Send the new post data to the parent (Posts component)
  };

  return (
    <>
 <Box
  display="flex"
  gap="4"
  bg="whiteAlpha.100"
  height="70px"
  alignItems="center"
  justifyContent="space-between"
  boxShadow="2xl"
  rounded="md"
  px="15px"
  position="fixed"
  top="5"
  zIndex="10" // Set a higher zIndex to ensure it is above other elements
  w={{ base: "82%", sm: "64%" }}
  backgroundColor="white"
>
  <Button
    onClick={() => {
      setOverlay(<OverlayOne />);
      onOpen();
    }}
    aria-label="Create a new post"
    colorScheme="green"
    size="lg"
    width={{ base: "9rem" }}
    borderRadius="lg"
    boxShadow="lg"
    _hover={{ bg: "green.600" }}
    shadow="dark-lg"
  >
    New Post
  </Button>

  <IconButton
    icon={<MdLogout />}
    aria-label="Logout"
    variant="solid"
    colorScheme="red"
    onClick={handleLogout}
    size="lg"
    borderRadius="full"
    _hover={{ bg: "red.600" }}
    shadow="dark-lg"
  />
</Box>



      <CreatePost isOpen={isOpen} onClose={onClose} overlay={overlay} newPost={handleNewPost} />
    </>
  );
}

export default Navbar;
