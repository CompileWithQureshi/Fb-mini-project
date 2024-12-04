import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Spinner, Container, SimpleGrid, useToast } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Cards from "../../components/Card";

function Posts() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("/api/post", {
          headers: { Authorization: `Bearer ${token}` },
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
    <main className="w-full ">
      <Navbar addNewPost={newPostData} /> 



      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6} width="100%" marginY={"20"} >
        {postData.length === 0 ? (
          <Text textAlign="center" color="gray.500" fontSize="xl">
            No posts found.
          </Text>
        ) : (
          postData.map((post) => {
            const { userId, content, likesId, comments, _id } = post;
            return (
              <Cards
                key={_id}
                data={{ userId, content, likesId, comments, _id }}
                deletePost={deletePost}
              />
            );
          })
        )}
      </SimpleGrid>
    </main>
  );
}

export default Posts;
