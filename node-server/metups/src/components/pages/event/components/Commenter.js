import { Avatar, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function Commenter({ username, image }) {
  return (
    <VStack w={'170px'} p={2}>
      <Avatar name={username} src={image} />
      <Text fontWeight={'bold'} fontSize={'xs'}>
        {username}
      </Text>
    </VStack>
  )
}

export default Commenter
