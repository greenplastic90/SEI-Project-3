import { Stack, Text } from '@chakra-ui/react'
import React from 'react'

function ProfileImage({ user }) {
  console.log(user.profilePhoto)
  return (
    <Stack
      borderTopRadius={'xl'}
      justify={'end'}
      p={6}
      bgImage={
        user.profilePhoto
          ? user.profilePhoto
          : 'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg'
      }
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
