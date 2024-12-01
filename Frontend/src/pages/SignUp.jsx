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
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [isError, setIsError] = useState({
    isUser: false,
    isEmail: false,
    isPassword: false,
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setIsError((prevErrors) => ({ ...prevErrors, [name]: false }));
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
      isPassword: user.password === '',
    };

    setIsError(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await axios.post('/api/user', user);

      if (response.status === 200) {
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          setUser({
            userName: '',
            email: '',
            password: '',
          });
          navigate('/login');
          setIsError({
            isUser: false,
            isEmail: false,
            isPassword: false,
          });
        }, 2000);
      } else {
        toast({
          title: response.statusText,
          description: 'Something went wrong.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
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
    <div className="flex justify-center items-center h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-100 p-8 rounded-lg shadow-lg sm:p-16"
      >
        <h1 className="text-center font-mono font-semibold text-2xl sm:text-3xl mb-6">
          Sign Up
        </h1>
        <FormControl isInvalid={isError.isUser} mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Username"
            name="userName"
            value={user.userName}
            onChange={handleInputChange}
          />
          {isError.isUser && (
            <FormErrorMessage>User Name is required.</FormErrorMessage>
          )}
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
          {isError.isEmail && (
            <FormErrorMessage>
              Invalid or empty email address.
            </FormErrorMessage>
          )}
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
          {isError.isPassword && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="green"
          width="full"
          className="mt-4"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
