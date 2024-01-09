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
      await axios.put('/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate('/profile')
    } catch (err) {
      console.log(err.response.data)

      if (err.response.data.message.includes('is shorter than the minimum allowed length (8).'))
        setFormError('Password is shorter than is allowed (8).')
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
                <Button
                  type='submit'
                  bgSize={'auto'}
                  onClick={() => {
                    toast({
                      title: 'Successfully changed password',
                      desc: 'You have successfully changed your password',
                      status: 'success',
                      duration: '2000',
                      isClosable: true,
                    })
                  }}
                  onClose={onClose}>
                  Submit
                </Button>
              </Center>
              {formError && <Text>{formError}</Text>}
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter alignSelf={'center'}>
          <Center>
            <Text textAlign={'center'}>Click anywhere on the page to leave</Text>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ResetPasswordModal
