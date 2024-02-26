import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../../auth/helpers'
import { useNavigate } from 'react-router-dom'

function ResetPasswordModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirmation: '',
  })
  const [formError, setFormError] = useState('')

  const navigate = useNavigate()
  const toast = useToast()

  const handleChange = (e) => {
    const newValue = { ...formData, [e.target.name]: e.target.value }
    setFormData(newValue)
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put('/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log({ res })
      toast({
        title: 'Reset Success',
        description: 'You have successfully reset your password',
        status: 'success',
        duration: '5000',
        isClosable: true,
      })
      onClose()
      setFormData({
        password: '',
        passwordConfirmation: '',
      })
    } catch (err) {
      let errorDescription = ''
      if (err.response.data.message.includes('is shorter than the minimum allowed length (8).')) {
        errorDescription = 'Password must be atleast 8 charecters long.'
      } else if (err.response.data.message.includes('Path `password` is required')) {
        errorDescription = 'New Password is a required feild.'
      } else {
        errorDescription = err.response.data.message
      }
      toast({
        title: 'Rest Password Failed',
        description: errorDescription,
        status: 'error',
        duration: '8000',
        isClosable: true,
      })
      console.log(err.response.data)
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              {/* <FormLabel htmlFor='password'>Old Password</FormLabel>
                <Input id='oldPass' type='password' /> */}
              <FormLabel htmlFor='password'>New Password</FormLabel>
              <Input id='newPass' onChange={handleChange} name='password' type='password' />
              <FormLabel htmlFor='password'>Password Confirmation</FormLabel>
              <Input
                id='passConf'
                onChange={handleChange}
                name='passwordConfirmation'
                type='password'
              />
              <Center my={'3'}>
                <Button type='submit' bgSize={'auto'}>
                  Submit
                </Button>
              </Center>
              {/* {formError && <Text>{formError}</Text>} */}
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ResetPasswordModal
