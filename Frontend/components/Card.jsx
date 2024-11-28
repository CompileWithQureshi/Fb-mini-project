import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Text,
  Box,
  Avatar,
  Flex,
  Button,
  Heading,
  Image,
  HStack,
  VStack,
  Input,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../hooks/AuthContext";

function Cards({ data }) {
  const { token, user } = useContext(AuthContext);

  const { userId, content, likesId, comments, _id } = data;
  const [islike, setIslike] = useState(likesId?.includes(user.userId));
  const [likesCount, setLikesCount] = useState(likesId?.length);
  const [commentData, setCommentData] = useState(comments || []);
  const [showComment, setShowComment] = useState(false);
  const [newComment, setNewComment] = useState("");

  async function handleLike() {
    try {
      const response = await axios.post(
        "/api/post/like",
        { postId: _id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { message } = response.data;
      console.log("message", response.message);

      if (message === "liked") {
        setIslike(true); // Mark as liked
        setLikesCount((prev) => prev + 1); // Increment the likes count
      } else if (message === "unliked") {
        setIslike(false); // Mark as unliked
        setLikesCount((prev) => prev - 1); // Decrement the likes count
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }
  // console.log('commentData',commentData);
  function toggleCommnet() {
    setShowComment(!showComment);
  }

  async function addComment() {
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      // console.log(_id);
      const response = await axios.post(
        "/api/post/comment",
        { postId: _id, comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data.comments);
      setCommentData((prevComment) => [
        { comment: newComment, _id: response.data.data._id },
        ,
        ...prevComment,
      ]);

      setNewComment("");

      // window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card
      maxW="md"
      margin={5}
      w="170rem"
      textAlign="start"
      boxShadow="2xl"
      p="6"
      rounded="md"
      bg="white"
    >
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" justifyContent="flex-start" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">{userId?.userName || "Guest"}</Heading>
              <Text fontStyle="italic" fontSize="small" fontWeight="semibold">
                Creator
              </Text>
            </Box>
          </Flex>
          {/* <IconButton
        variant='ghost'
        colorScheme='gray'
        aria-label='See menu'
        icon={<BsThreeDotsVertical />}
      /> */}
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{content}</Text>
      </CardBody>
      {/* <Image
    objectFit='cover'
    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    alt='Chakra UI'
  /> */}

      <CardFooter
        justify="center"
        alignItems="center"
        flexWrap="wrap"
        gap="100px"
      >
        <Flex alignItems="center">
          <Text fontSize={20} fontWeight={600} mr={2}>
            {likesCount}
          </Text>
          <IconButton
            variant="unstyled" // Ghost style for the button itself
            icon={<BiLike color={islike ? "red" : "gray"} size="30px" />} // Change icon color dynamically
            onClick={handleLike} // Handle like toggle
            aria-label="Like Post"
          />
        </Flex>

        <HStack spacing={2} alignItems="center">
          <IconButton
            variant="unstyled"
            icon={
              <BiChat
                color={commentData?.length > 0 ? "green" : "gray"}
                size="30px"
              />
            }
            aria-label="Comment"
            onClick={toggleCommnet}
          />
          {commentData?.length > 0 && <Text>{commentData.length}</Text>}
        </HStack>

        {/* <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
      Share
    </Button> */}
      </CardFooter>
      {showComment && (
        <VStack>
          <Box
            width="100%"
            boxShadow="inner"
            backgroundColor="gray.100"
            padding="15px"
            rounded="xl"
            margin="5px"
          >
            <Flex
              flexDirection="column"
              gap="10px"
              justifyContent="start"
              margin="5px"
            >
              {commentData.map((comm) => {
                const { comment } = comm;

                return (
                  <>
                    <Text
                      padding="5px 10px "
                      maxWidth="250px"
                      align="start"
                      rounded="md"
                      color="gray.500"
                      backgroundColor="white"
                      alignItems="center"
                      shadow="lg"
                      fontWeight="medium"
                      fontFamily="cursive"
                    >
                      {comment}
                    </Text>
                  </>
                );
              })}
              {newComment ? (
                <Text
                  padding="5px 10px "
                  maxWidth="250px"
                  align="start"
                  rounded="md"
                  color="gray.500"
                  backgroundColor="white"
                  alignItems="center"
                  shadow="lg"
                  fontWeight="medium"
                  fontFamily="cursive"
                >
                  {newComment || null}
                </Text>
              ) : (
                ""
              )}
            </Flex>
            <Flex align="center" justifyContent="space-between" gap="5px">
              <Input
                placeholder="comment"
                boxShadow="inner"
                backgroundColor="gray.300"
                padding="15px"
                rounded="md"
                width="400px"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button colorScheme="green" shadow="dark-lg" onClick={addComment}>
                Add
              </Button>
            </Flex>
          </Box>
        </VStack>
      )}
    </Card>
  );
}

export default Cards;
