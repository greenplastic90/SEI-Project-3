import { Avatar, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

function Host({ owner }) {
  const { username, profilePhoto } = owner
  return (
    <HStack spacing={6}>
      <Avatar name={username} src={profilePhoto} />
      <Stack spacing={0}>
        <Text>Hosted By</Text>
        <Text fontWeight={'bold'}>{username}</Text>
      </Stack>
    </HStack>
  )
}

export default Host
