import React, { useEffect, useRef, useState,useContext } from "react";
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


function CreatePost({ isOpen, onClose,onNewPost  }) {
    const[content,setContent]=useState('')
  // Use refs for focus management
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const {user,token}=useContext(AuthContext)

  function handleInputChange(e) {
    const {value}=e.target
    setContent(value)
  }

  const handleContent=async(e)=>{
    e.preventDefault()
    // console.log(content);

    if (!content.trim()) {
        console.error(`content is empty`)
    }

    try {
        const response=await axios.post('/api/post',{userId:user,content},{
            headers: {
                Authorization: `Bearer ${token}`, // Authorization header
              },
        })

        if (response.status === 200) {
            console.log('response',response.data.data);
            onNewPost(response.data.data);
            setContent('')
            onClose()


        }
    } catch (error) {
        console.error("Error creating post:", error.response?.data || error.message);
      }
  

   
    

  }


  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a New Post</ModalHeader>
        <form onSubmit={handleContent}>

        <ModalBody pb={6}>
          {/* First input field */}
          
          {/* Second input field */}
            
          <FormControl mt={4}>
            <FormLabel>Content</FormLabel>
      <Textarea
        value={content}
        onChange={handleInputChange}
        placeholder='Here is a sample placeholder'
        size='sm'
      />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {/* Save Button */}
          <Button colorScheme="blue" mr={3} type="submit">
            Save
          </Button>
          {/* Cancel Button */}
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
        </form>

      </ModalContent>
    </Modal>
  );
}

export default CreatePost;
