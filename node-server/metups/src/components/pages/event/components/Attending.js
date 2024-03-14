import { Avatar, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function Attending({ attending }) {
  return (
    <Stack>
      <Heading variant='event'>{`Attending (${attending.length})`}</Heading>
      {attending.length !== 0 ? (
        <HStack overflowX='auto' width='100%' minWidth='0' spacing={4} p={4}>
          {attending.map((user) => (
            <VStack
              key={user._id}
              borderRadius='md'
              justify={''}
              px={4}
              pt={6}
              pb={10}
              boxShadow={'0px 0px 5px 0px rgba(0, 0, 0, 0.12)'}>
              <Avatar size='lg' name={user.owner.username} src={user.owner.profilePhoto} />
              <Text fontWeight={'bold'} fontSize={'sm'}>
                {user.owner.username}
              </Text>
            </VStack>
          ))}
        </HStack>
      ) : (
        <VStack h={'100px'} justify={'center'}>
          <Text fontWeight={'bold'}>Be the first to RSVP</Text>
        </VStack>
      )}
    </Stack>
  )
}

export default Attending
