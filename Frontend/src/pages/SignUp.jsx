import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';

function SignUp() {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    phone: '',
    password: ''
  });
  
  const [isError, setIsError] = useState({
    isUser: false,
    isEmail: false,
    isPassword: false,
  });

  const toast = useToast();  // Correct useToast hook usage

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setIsError((prevErrors) => ({ ...prevErrors, [name]: false })); // Reset error for this field
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      isUser: user.userName === '',
      isEmail: user.email === '' || !validateEmail(user.email),
      isPassword: user.password === ''
    };

    setIsError(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await axios.post('/api/user1', user);
      console.log("Response from server:", response);

      if (response.status === 200) {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        // Reset form and errors after a delay to show the toast
        setTimeout(() => {
          setUser({
            userName: '',
            email: '',
            phone: '',
            password: ''
          });
          setIsError({
            isUser: false,
            isEmail: false,
            isPassword: false
          });
        }, 2000);  // Optional: if you want to wait for the toast to close
      } else {
        toast({
          title: response.statusText,
          description: "Something went wrong.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
      toast({
        title: 'Error.',
        description: 'There was an error processing your request.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-[500px]">
        <FormControl isInvalid={isError.isUser} mb={4}>
          <FormLabel>User Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Username"
            name="userName"
            value={user.userName}
            onChange={handleInputChange}
          />
          {isError.isUser && <FormErrorMessage>User Name is required.</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={isError.isEmail} mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
          {isError.isEmail && <FormErrorMessage>Invalid or empty email address.</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={isError.isPassword} mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
          {isError.isPassword && <FormErrorMessage>Password is required.</FormErrorMessage>}
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
