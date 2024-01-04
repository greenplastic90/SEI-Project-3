import axios from 'axios'
import React, { useEffect } from 'react'
import { getTokenFromLocalStorage } from '../../../auth/helpers'
import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react'

function Profile({ user, setUser }) {
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
  }, [setUser])
  return (
    <VStack>
      {user && (
        <VStack>
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
            <VStack>
              <Text fontSize={'xx-large'} fontWeight={'bold'}>
                {user.ownedEvents.length}
              </Text>
              <Text>My Events</Text>
            </VStack>
            <Box w={'1px'} h={'50px'} borderRight={'1px solid'} borderColor={'gray.400'}></Box>
            <VStack>
              <Text fontSize={'xx-large'} fontWeight={'bold'}>
                {user.likedEvents.length}
              </Text>
              <Text>RSVPs</Text>
            </VStack>
          </HStack>
        </VStack>
      )}
    </VStack>
  )
}

export default Profile
