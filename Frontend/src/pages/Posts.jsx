import { useState, useEffect,useContext } from "react";
import axios from "axios";
import Cards from "../../components/Card";
import { Button, useDisclosure ,ModalOverlay,IconButton } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";

import CreatePost from "../../components/CreatePost";
import { AuthContext } from "../../hooks/AuthContext";

function Posts() {
  const [postData, setPostData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = useState(null)
  const {logout} =useContext(AuthContext)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Retrieved Token:", token);

        const result = await axios.get("/api/post", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        console.log("API Response:", result);
        setPostData(result.data.posts);
      } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);
  console.log('apip',postData);

  const OverlayOne=()=>(
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  function onLogout(params) {
    logout()
    
  }
  
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-center  w-full">
      {postData.length === 0?<h1>No post Found</h1>:postData.map((post) =>{
        const {userId,content,likesId,comment}=post

        console.log('like',likesId?.[0]);
        
        
        
        return(
          <>
          <Cards data={{userId,content,likesId,comment}}/>
          </>
        )
      })}
    </div>
    <div className="absolute top-16 right-80">
    <Button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
      >
        Create New Post
      </Button>

      <span>   </span>
      <IconButton
      icon={<MdLogout />} // Logout icon
      aria-label="Logout"
      variant="ghost" // Makes the button transparent (ghost style)
      colorScheme="red" // You can change the color to suit your design
      onClick={onLogout} // Handle the logout functionality
      size="lg" // Adjust the size as necessary
    />

    </div>
      <CreatePost isOpen={isOpen} onClose={onClose} overlay={overlay} />
    </div>
  );
}

export default Posts;
