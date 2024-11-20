import React, { useState ,useContext} from 'react'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import { AuthContext } from '../../hooks/AuthContext';

function Login() {

  const [userData,setUserData]=useState({
    email:'',
    password:''
  })
  const [isError,setIsError]=useState({
    isEmail:false,
    isPassword:false
  })
  const {logins}=useContext(AuthContext)
  const navigate=useNavigate()
  const handelChange=(e)=>{
    const {name,value}=e.target
    console.log(name);

    setUserData((prevdata)=>({...prevdata,[name]:value}))
    setIsError((prevError)=>({...prevError,[name]:false}))
    

  }
  const toast=useToast()

  async function handleSubmit (e){
    console.log(isError);
    
    e.preventDefault()
  const newError={
      isEmail:userData.email ==='',
      isPassword:userData.password ===''
  }
  setIsError(newError)
    // console.log(isError.isPassword);
    
    if (Object.values(newError).some((error) => error)) {
      return;
    }
    
    try {
      const response= await axios.post('/api/user/login',userData)
      const {message,token}=response.data
      console.log('message:',message);
      // console.log('token:',token);
      logins(token)
      if (response.status ===200) {
          toast({
            title:message,
            description:'User Login',
            status:'success',
            variant:'subtle',
            position:'bottom',
            isClosable:true,
            duration:2000
          })
          setTimeout(()=>{
            setUserData({
              email:'',
              password:''
            })
            navigate('/post')
          },3000)

          clearTimeout()
      }
      
      
    } catch (error) {
      // console.log('error',error.response.data.message);
      const {message}=error.response.data
      // console.log(message);
      
      toast({
        title:error.message,
        description:message,
        status:'error',
        variant:'subtle',
        position:'bottom',
        isClosable:true,
        duration:2000
      })
    }
  }

  return (
    <div className='flex justify-center items-center h-full mt-[200px] '>
      <form  method="post" className='w-[400px] bg-slate-100 p-16 rounded-md flex flex-col gap-y-4' onSubmit={handleSubmit}>
        <FormControl isInvalid={isError.isEmail} >
          <FormLabel>Email </FormLabel>
          <Input type='email' placeholder='Enter email' name='email' value={userData.email} onChange={handelChange}/>
          {isError.isEmail && <FormErrorMessage>Email required</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={isError.isPassword}>
          <FormLabel>Password </FormLabel>
          <Input type='password' placeholder='Enter password' name='password' value={userData.password} onChange={handelChange}/>
          {isError.isPassword && <FormErrorMessage>password required</FormErrorMessage>}
        </FormControl>
        <Button type='submit' colorScheme='green' fontSize={20} fontWeight={600}>Login</Button>

      </form>
    </div>
  )
}

export default Login