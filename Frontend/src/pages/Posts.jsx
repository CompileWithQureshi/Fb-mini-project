import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cards from "../../components/Card";
import {
  Button,
  useDisclosure,
  ModalOverlay,
  IconButton,
  Box,
  VStack,
  Text,
  Spinner,
  useToast,
  Container,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import CreatePost from "../../components/CreatePost";
import { AuthContext } from "../../hooks/AuthContext";

function Posts() {
  const [postData, setPostData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(null);
  const { logout } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("/api/post", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPostData(result.data.data);
      } catch (error) {
        setError("Error fetching posts.");
        console.error("Error Response:", error.response?.data || error.message);
        toast({
          title: "Error",
          description: "Failed to load posts, please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
  );

  function onLogout() {
    logout();
  }

  const newPostData = (newPost) => {
    setPostData((prevPost) => [newPost, ...prevPost]);
    toast({
      title: "Post Created",
      description: "Your new post has been successfully created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const deletePost = (postId) => {
    setPostData((prevPost) => prevPost.filter((posts) => posts._id !== postId));
    toast({
      title: "Post Deleted",
      description: "The post has been deleted successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (loading) return <Box className="flex justify-center mt-8"><Spinner size="xl" /></Box>;
  if (error) return <Box className="flex justify-center mt-8"><Text color="red.500">{error}</Text></Box>;

  return (
    <Container maxW="container.lg" py={6}>
      <Box mb={6} className="flex justify-between items-center sm:flex-col sm:items-center">
        {/* Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 fixed z-10 left-1/3 ">
          <Button
            onClick={() => { setOverlay(<OverlayOne />); onOpen(); }}
            colorScheme="green"
            size="lg"
            width={{ base: "full", sm: "auto" }}
            borderRadius="lg"
            boxShadow="lg"
            _hover={{ bg: "green.600" }}
          >
            Create New Post
          </Button>
          <IconButton
            icon={<MdLogout />}
            aria-label="Logout"
            variant="solid"
            colorScheme="red"
            onClick={onLogout}
            size="lg"
            borderRadius="full"
            width={{ base: "full", sm: "auto" }}
            _hover={{ bg: "red.600" }}
          />
        </div>
      </Box>

      {/* Posts Section */}
      <VStack
        spacing={6}
        align="stretch"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {postData.length === 0 ? (
          <Text textAlign="center" color="gray.500" fontSize="xl">
            No posts found.
          </Text>
        ) : (
          postData.map((post) => {
            const { userId, content, likesId, comments, _id } = post;
            return (
              <Cards
                key={post._id}
                data={{ userId, content, likesId, comments, _id }}
                deletePost={deletePost}
              />
            );
          })
        )}
      </VStack>

      <CreatePost
        isOpen={isOpen}
        onClose={onClose}
        overlay={overlay}
        newPost={newPostData}
      />
    </Container>
  );
}

export default Posts;
