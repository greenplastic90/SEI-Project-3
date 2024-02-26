import { Avatar, HStack, Text, Stack } from '@chakra-ui/react'
import React from 'react'

function BurgerFooter({ user, actionFunc, handleLogout, action }) {
  return (
    <>
      {user && (
        <HStack w={'full'} justify={'space-between'}>
          <HStack onClick={actionFunc}>
            <Avatar name={user.username} src={user.profilePhoto} />
            <Stack spacing={0}>
              <Text fontWeight={'bold'}>{user.username}</Text>
              <Text color={'blackAlpha.500'}>{action}</Text>
            </Stack>
          </HStack>
          <Text onClick={handleLogout} fontSize={'lg'} cursor={'pointer'} fontWeight={'bold'}>
            Log out
          </Text>
        </HStack>
      )}
    </>
  )
}

export default BurgerFooter
