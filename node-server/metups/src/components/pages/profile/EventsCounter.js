import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function EventsCounter({ user }) {
  return (
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
  )
}

export default EventsCounter
