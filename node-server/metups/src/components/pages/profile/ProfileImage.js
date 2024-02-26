import { Stack, Text } from '@chakra-ui/react'
import React from 'react'

function ProfileImage({ user }) {
  return (
    <Stack
      borderTopRadius={'xl'}
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
  )
}

export default ProfileImage
