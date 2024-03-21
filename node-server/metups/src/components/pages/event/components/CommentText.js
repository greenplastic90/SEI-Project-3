import { Stack, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import React from 'react'

function CommentText({ text, createdAt }) {
  return (
    <Stack
      w={'full'}
      justify={'space-around'}
      minH={'95px'}
      p={2}
      bgColor={'brand.primary.50'}
      borderRadius={'md'}>
      <Text>{text}</Text>
      <Text fontSize={'sm'} color={'brand.secondary.500'} alignSelf={'end'}>
        {format(parseISO(createdAt), 'hh:mm a - dd/MM/yyyy')}
      </Text>
    </Stack>
  )
}

export default CommentText
