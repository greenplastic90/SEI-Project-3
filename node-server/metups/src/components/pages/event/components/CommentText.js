import { Stack, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import React from 'react'

function CommentText({ text, createdAt, bgColor }) {
  return (
    <Stack
      w={'full'}
      justify={'space-around'}
      minH={'95px'}
      px={2}
      bgColor={bgColor ? 'brand.primary.50' : 'brand.secondary.50'}
      // borderRadius={'md'}
    >
      <Text>{text}</Text>
      <Text
        fontSize={'sm'}
        color={bgColor ? 'brand.secondary.500' : 'brand.primary.500'}
        alignSelf={'end'}>
        {format(parseISO(createdAt), 'hh:mm a - dd/MM/yyyy')}
      </Text>
    </Stack>
  )
}

export default CommentText
