import { Avatar, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function Commenter({ username, image }) {
  return (
    <VStack minW={'80px'} maxW={'80px'} p={2}>
      <Avatar size='sm' name={username} src={image} />
      <Text fontWeight={'bold'} fontSize={'xs'}>
        {username}
      </Text>
    </VStack>
  )
}

export default Commenter
