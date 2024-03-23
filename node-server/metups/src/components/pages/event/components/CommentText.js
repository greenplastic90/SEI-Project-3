import { HStack, Stack, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import React from 'react'
import DeleteComment from './DeleteComment'
import { getPayload } from '../../../../auth/helpers'

function CommentText({ comment, handleDelete }) {
  const { _id, text, createdAt, owner } = comment
  const isOwner = getPayload()?.sub === owner._id
  return (
    <Stack
      w={'full'}
      justify={'space-around'}
      minH={'95px'}
      p={2}
      bgColor={'brand.primary.50'}
      borderRadius={'md'}>
      <Text>{text}</Text>
      <HStack justify={isOwner ? 'space-between' : 'end'}>
        {isOwner && <DeleteComment handleDelete={() => handleDelete(_id)} />}
        <Text fontSize={'sm'} color={'brand.secondary.500'}>
          {format(parseISO(createdAt), 'hh:mm a - dd/MM/yyyy')}
        </Text>
      </HStack>
    </Stack>
  )
}

export default CommentText
