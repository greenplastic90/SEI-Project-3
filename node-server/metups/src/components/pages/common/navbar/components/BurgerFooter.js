import { Avatar, HStack, Text, Stack } from '@chakra-ui/react'
import React from 'react'

function BurgerFooter({ user, profilePath, handleLogout }) {
  const { username, profilePhoto } = user

  return (
    <HStack w={'full'} justify={'space-between'}>
      <HStack onClick={profilePath}>
        <Avatar name={username} src={profilePhoto} />
        <Stack spacing={0}>
          <Text fontWeight={'bold'}>{username}</Text>
          <Text color={'blackAlpha.500'}>View profile</Text>
        </Stack>
      </HStack>
      <Text onClick={handleLogout} fontSize={'lg'} cursor={'pointer'}>
        Log out
      </Text>
    </HStack>
  )
}

export default BurgerFooter
