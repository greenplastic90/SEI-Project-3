import axios from 'axios'
import React, { useEffect } from 'react'
import { getTokenFromLocalStorage } from '../../../auth/helpers'
import { Box, HStack, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import BurgerFooter from '../common/navbar/components/BurgerFooter'
import ResetPasswordModal from './ResetPasswordModal'
import { useNavigate } from 'react-router-dom'

function Profile({ user, setUser, handleLogout }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  function logoutAndNavigate() {
    handleLogout()
    navigate('/')
  }
  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        console.log(data)
        setUser(data)
      }
      getUserProfile()
    } catch (error) {
      console.log(error)
    }
  }, [navigate, setUser])
  return (
    <VStack>
      {user && (
        <VStack justify={'space-between'}>
          <Stack
            justify={'end'}
            p={6}
            bgImage={user.profilePhoto}
            bgPosition={'center'}
            bgSize={'cover'}
            h={'350px'}
            w={'350px'}>
            <Text fontSize={'xx-large'} fontWeight={'bold'} variant='profile'>
              {user.username}
            </Text>
            <Text variant='profile'>{user.email}</Text>
          </Stack>
          <HStack w={'full'} justify={'space-around'}>
            <VStack w={'full'}>
              <Text fontSize={'xx-large'} fontWeight={'bold'}>
                {user.ownedEvents?.length}
              </Text>
              <Text>My Events</Text>
            </VStack>
            <Box w={'1px'} h={'50px'} borderRight={'1px solid'} borderColor={'gray.400'}></Box>
            <VStack w={'full'}>
              <Text fontSize={'xx-large'} fontWeight={'bold'}>
                {user.likedEvents?.length}
              </Text>
              <Text>RSVPs</Text>
            </VStack>
          </HStack>
        </VStack>
      )}

      <Box p={4} w={'350px'} border={'1px solid red'} borderRadius={'xl'}>
        <BurgerFooter
          user={user}
          action={'Password reset'}
          actionFunc={onOpen}
          handleLogout={logoutAndNavigate}
        />
      </Box>

      <ResetPasswordModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  )
}

export default Profile
