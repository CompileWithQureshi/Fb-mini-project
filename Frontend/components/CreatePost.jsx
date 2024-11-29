import React, { useRef, useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../hooks/AuthContext";

function CreatePost({ isOpen, onClose, newPost }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const initialRef = useRef(null);
  const { user, token } = useContext(AuthContext);

  const handleInputChange = (e) => setContent(e.target.value);

  const handleContent = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/post",
        { userId: user, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        if (typeof newPost === "function") newPost(response.data.data);
        setContent("");
        onClose();
      }
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      alert("Failed to create the post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={{ base: "90%", sm: "80%", md: "40%" }} maxW="600px" p={{ base: 4, sm: 6 }}>
        <ModalHeader>Create a New Post</ModalHeader>
        <form onSubmit={handleContent}>
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                ref={initialRef}
                value={content}
                onChange={handleInputChange}
                placeholder="Write something..."
                size="sm"
                resize="vertical" // Allow vertical resizing
              />
            </FormControl>
          </ModalBody>
          <ModalFooter display="flex" flexWrap="wrap" gap={2}>
            <Button
              colorScheme="green"
              type="submit"
              isLoading={isLoading}
              w={{ base: "full", sm: "auto" }}
            >
              Save
            </Button>
            <Button onClick={onClose} w={{ base: "full", sm: "auto" }}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreatePost;
