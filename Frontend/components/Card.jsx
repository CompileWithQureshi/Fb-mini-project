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
    Image 
  } from '@chakra-ui/react';
  import { BiLike, BiChat, BiShare } from 'react-icons/bi';
import { useState,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../hooks/AuthContext';

function Cards({data}) {
  const {token,user}=useContext(AuthContext)

  const {userId,content,likesId,comment,_id}=data;
  const [islike, setIslike] = useState(likesId?.includes(user.userId));
  const [likesCount, setLikesCount] = useState(likesId?.length);

    // console.log('like',like);
    

    async function handleLike() {
      
      try {
        const response=await axios.post('/api/post/like',{postId:_id},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { message } = response.data;
        console.log( message);
    
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
  return (
    <Card maxW='md' margin={5} w='170rem' textAlign='start' boxShadow='2xl' p='6' rounded='md' bg='white'>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4'  justifyContent='flex-start'flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

        <Box>
          <Heading size='sm' >{userId?.userName || 'Guest'}</Heading>
          <Text>Creator, Chakra UI</Text>
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
    <Text>
      {content}
    </Text>
  </CardBody>
  {/* <Image
    objectFit='cover'
    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    alt='Chakra UI'
  /> */}

  <CardFooter
    justify='space-between'
    alignItems='center'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Flex alignItems="center">
    <Text fontSize={20} fontWeight={600} mr={2}>
    {likesCount}
    </Text>
    <IconButton
      variant="unstyled" // Ghost style for the button itself
      icon={<BiLike color={islike ? 'red' : 'gray'} size="30px" />} // Change icon color dynamically
      onClick={handleLike} // Handle like toggle
      aria-label="Like Post"
    />
  </Flex>
     
    <IconButton
   
   variant="unstyled" // Ghost style for the button itself
   icon={<BiChat color='gray'  size='30px' />} // Change icon color dynamically
   // Handle like toggle
   aria-label="Comment"
 />
    {/* <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
      Share
    </Button> */}
  </CardFooter>
</Card>
  )
}

export default Cards