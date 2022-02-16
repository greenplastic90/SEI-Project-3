import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Heading, FormControl, FormLabel, Input, Container, Button, Center, Text, useToast } from '@chakra-ui/react'
import { getTokenFromLocalStorage } from '../../../auth/helpers'

const ResetPassword = ({ pass }) => {

  const toast = useToast()

  // State variable
  const [ formData, setFormData ] = useState({
    password: '',
    passwordConfirmation: ''
  })
  const [ formError, setFormError] = useState('')

  const handleChange = (e) => {
    const newValue = { ...formData, [e.target.name]: e.target.value }
    setFormData(newValue)
    setFormError('')
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put('/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
    } catch (err) {
      console.log(err.response.data)
      
      const obj = {}
      if (err.response.data.message.includes('is shorter than the minimum allowed length (8).'))
    
      setFormError('Password is shorter than is allowed (8).')
    }
  }

  // console.log(password)

  return (
    <Container>
      <Heading>Reset Password</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          {/* <FormLabel htmlFor='password'>Old Password</FormLabel>
          <Input id='oldPass' type='password' /> */}
          <FormLabel htmlFor='password'>New Password</FormLabel>
          <Input id='newPass' onChange={handleChange} name='password' type='password' />
          <FormLabel htmlFor='password'>Password Confirmation</FormLabel>
          <Input id='passConf' onChange={handleChange} name='passwordConfirmation' type='password' />
          <Center my={'3'}>
            <Button type='submit' bgSize={'auto'} onClick={() => {
                toast({
                  title: "Successfully changed password",
                  desc: "You have successfully changed your password",
                  status: "success",
                  duration: "2000",
                  isClosable: true
                })
              }} >
              Submit
            </Button>
          </Center>
          {formError && (
            <Text>{formError}</Text>
          )}
        </FormControl>
      </form>
    </Container>
  )

}

export default ResetPassword