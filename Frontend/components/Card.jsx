import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Input,
  Text,
  Box,
  Avatar,
  Flex,
  Button,
  Heading,
  Image,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea
} from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiLike, BiChat, BiSolidEdit } from "react-icons/bi";
import { useState, useRef } from "react";
import axios from "axios";

function Cards({ data,deletePost }) {
  const user = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const { userId, content, likesId, comments, _id } = data;
  const [islike, setIslike] = useState(likesId?.includes(user.userId));
  const [likesCount, setLikesCount] = useState(likesId?.length);
  const [commentData, setCommentData] = useState(comments || []);
  const [showComment, setShowComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [contents, setContents] = useState(content);
  const [isError,setIsError]=useState(false)

  // console.log(userId._id);
  // console.log('postId',_id);
  
  const inputRef = useRef(null);

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
      console.log("message", message);

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
  function handleFocus() {
    if (inputRef.current) {
      inputRef.current.focus(); // This will focus the input field
    }
    console.log(inputRef.current);
    setIsEditing(!isEditing || false);
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

        ...prevComment,
      ]);

      setNewComment("");

      // window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(userId._id === user);
  function handleContent(e) {
      setContents(e.target.value)
      if (e.target.value.trim() === "") {
        setIsError(true);
      } else {
        setIsError(false);
      }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (contents.trim() === "") {
      setIsError(true);
      return;
    }

    // console.log("Submitted Content:", contents);
try {
  const response=await axios.patch('/api/post',{postId:_id,content:contents},{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(token);
  
  // console.log(response.data.data.content);
  // content=response.data.data.content
  const updateContent=response.data.data.content
  console.log(updateContent);
  
  
  setContents(updateContent); 
  setIsEditing(false)
} catch (error) {
  console.log(error);
  
}
   
  }
// console.log(content);
async function handleDelete() {
  // console.log('postId',_id);
try {
  const response = await axios.delete('/api/post', {
    params: { postId: _id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log('token',token);
  console.log(response.data.data._id);

  const deletedPostId = response.data.data._id;

  deletePost(deletedPostId)

  
} catch (error) {
  console.log(error);
  
}
  
}
const isOwner = userId._id === user
  return (
    <>
      {isOwner ? (
        <Card
        minH="400px" // Set consistent height
        w="100%"
        my={5} // Avoid stacking overlap
        textAlign="start"
        boxShadow="lg"
        rounded="md"
        bg="white"
        p={'5px'}
      >
        <CardHeader>
          <Flex
            spacing="4"
            direction={{ base: "column", sm: "row" }} // Stack on smaller screens
          >
            <Flex
              flex="1"
              gap="4"
              justifyContent="flex-start"
              alignItems="center"
              flexWrap="wrap"
            >
              <Avatar
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
              />
      
              <Box>
                <Heading size="sm">{userId?.userName || "Guest"}</Heading>
                <Text
                  fontStyle="italic"
                  fontSize="small"
                  fontWeight="semibold"
                >
                  Creator
                </Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          {isEditing ? (
            <form method="Patch" onSubmit={handleSubmit}>
              <FormControl isInvalid={isError}>
                <FormLabel fontSize="lg" fontWeight="bold">Content</FormLabel>
                <Textarea
                    ref={inputRef}
                    value={contents}
                    onChange={handleContent}
                    resize="none" // Prevent resizing manually
                    minHeight="400px" // Minimum height
                    height='fit-content' // Maximum height
                    borderColor={isError ? "red.500" : "gray.300"}
                  />
                {isError ? (
                  <FormErrorMessage
                    fontStyle="normal"
                    fontSize="sm"
                    fontWeight="semibold"
                    color="red.400"
                  >
                    Content is required.
                  </FormErrorMessage>
                ) : (
                  <FormHelperText
                    fontStyle="normal"
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.500"
                  >
                    Write descriptive and clear content to engage your audience.
                    <Button margin='5px' colorScheme="green" type="submit">Submit</Button>
                  </FormHelperText>
                )}
              </FormControl>
            </form>
          ) : (
            <Text ref={inputRef} borderY={'1px'} p={1}>{contents}</Text>
          )}
        </CardBody>
        <CardFooter
          justify="center"
          alignItems="center"
          
          gap="20px" // Smaller gap for mobile responsiveness
          width="100%"
          
        >
          <Flex alignItems="center">
            <Text fontSize={20} fontWeight={600} mr={2}>
              {likesCount}
            </Text>
            <IconButton
              variant="unstyled"
              icon={<BiLike color={islike ? "red" : "gray"} size="30px" />}
              onClick={handleLike}
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
          <IconButton
            variant="unstyled"
            icon={<BiSolidEdit color={"gray"} size="30px" />}
            aria-label="Edit"
            onClick={handleFocus}
          />
          <IconButton
            variant="unstyled"
            color="red.400"
            icon={<RiDeleteBin6Line size="30px" />}
            aria-label="Delete"
            onClick={handleDelete}
          />
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
                    <Text
                      padding="5px 10px"
                      maxWidth="250px"
                      align="start"
                      rounded="md"
                      color="gray.500"
                      backgroundColor="white"
                      alignItems="center"
                      shadow="lg"
                      fontWeight="medium"
                    height='auto'

                      fontFamily="cursive"
                    >
                      {comment}
                    </Text>
                  );
                })}
                {newComment ? (
                  <Text
                    padding="5px 10px"
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
              <Flex
                align="center"
                justifyContent="space-between"
                gap="5px"
              >
                <Input
                  placeholder="comment"
                  boxShadow="inner"
                  backgroundColor="gray.300"
                  padding="15px"
                  rounded="md"
                  width="100%" // Full width on mobile
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  colorScheme="green"
                  shadow="dark-lg"
                  onClick={addComment}
                >
                  Add
                </Button>
              </Flex>
            </Box>
          </VStack>
        )}
      </Card>
      
      ) : (
        <Card
        minH="400px" // Set consistent height
        w="100%"
        my={5} // Avoid stacking overlap
        textAlign="start"
        boxShadow="lg"
        rounded="md"
        bg="white"
        p={'5px'}
      >
          <CardHeader>
            <Flex spacing="4">
              <Flex
                flex="1"
                gap="4"
                justifyContent="flex-start"
                flexWrap="wrap"
              >
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                />

                <Box>
                  <Heading size="sm">{userId?.userName || "Guest"}</Heading>
                  <Text
                    fontStyle="italic"
                    fontSize="small"
                    fontWeight="semibold"
                  >
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
            <Text borderY={'1px'} p={1}>{content}</Text>
          </CardBody>
          {/* <Image
    objectFit='cover'
    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    alt='Chakra UI'
  /> */}

          <CardFooter
            justify="center"
            alignItems="center"
            
            gap="10px" // Smaller gap for mobile responsiveness
            width="100%"
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
                      height='auto'
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
                  <Button
                    colorScheme="green"
                    shadow="dark-lg"
                    onClick={addComment}
                  >
                    Add
                  </Button>
                </Flex>
              </Box>
            </VStack>
          )}
        </Card>
      )}
    </>
  );
}

export default Cards;
