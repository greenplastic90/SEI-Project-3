import axios from 'axios'
import React, { useEffect } from 'react'
import { getTokenFromLocalStorage } from '../../../auth/helpers'
import { HStack, Stack, Text, VStack } from '@chakra-ui/react'

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
    <>
      {user && (
        <VStack>
          <Stack
            justify={'end'}
            p={4}
            bgImage={user.profilePhoto}
            bgPosition={'center'}
            bgSize={'cover'}
            h={'50vh'}
            w={'full'}>
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

            <VStack>
              <Text fontSize={'xx-large'} fontWeight={'bold'}>
                {user.ownedEvents.length}
              </Text>
              <Text>My Events</Text>
            </VStack>
          </HStack>
        </VStack>
      )}
    </>
  )
}

export default Profile
