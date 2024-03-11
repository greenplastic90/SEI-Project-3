import { Avatar, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function Attending({ attending }) {
  return (
    <Stack>
      <Heading fontSize={'xl'} fontWeight={'bold'}>{`Attending (${attending.length})`}</Heading>
      <HStack overflowX='auto' width='100%' minWidth='0' spacing={4} p={4}>
        {attending.map((user) => (
          <VStack
            key={user._id}
            borderRadius='md'
            justify={''}
            px={4}
            pt={8}
            pb={12}
            boxShadow={'0px 0px 5px 0px rgba(0, 0, 0, 0.12)'}>
            <Avatar size='lg' name={user.owner.username} src={user.owner.profilePhoto} />
            <Text fontWeight={'bold'}>{user.owner.username}</Text>
          </VStack>
        ))}
      </HStack>
    </Stack>
  )
}

export default Attending
