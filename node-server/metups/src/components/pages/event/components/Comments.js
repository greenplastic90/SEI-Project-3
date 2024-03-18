import { Avatar, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import React from 'react'
import CommentForm from './CommentForm'

function Comments({ comments, eventID, setRefreshEvent }) {
  const sortedComments = comments
    .slice()
    .sort((a, b) => parseISO(b.createdAt) - parseISO(a.createdAt))

  return (
    <Stack spacing={4}>
      <Heading variant='event'>Comments</Heading>
      <CommentForm eventID={eventID} setRefreshEvent={setRefreshEvent} />

      <Stack>
        {sortedComments.map(({ _id, text, createdAt, owner }) => (
          <HStack key={_id} align={'self-start'}>
            <VStack p={2} border='1px solid' borderColor={'gray.100'} borderRadius={'md'}>
              <Avatar name={owner.username} src={owner.profilePhoto} />
              <Text fontWeight={'bold'} fontSize={'sm'}>
                {owner.username}
              </Text>
            </VStack>
            <Stack
              w={'full'}
              justify={'space-around'}
              minH={'95px'}
              px={2}
              bgColor={'gray.100'}
              borderRadius={'md'}>
              <Text>{text}</Text>
              <Text fontSize={'sm'} color={'brand.secondary.500'} alignSelf={'end'}>
                {format(parseISO(createdAt), 'hh:mm a - dd/MM/yyyy')}
              </Text>
            </Stack>
          </HStack>
        ))}
      </Stack>
    </Stack>
  )
}

export default Comments
