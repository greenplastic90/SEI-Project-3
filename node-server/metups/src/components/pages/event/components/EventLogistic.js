import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'

function EventLogistic({ text, icon }) {
  return (
    <HStack>
      <Box color={'gray.400'}>{icon}</Box>
      <Text fontSize={'sm'}>{text}</Text>
    </HStack>
  )
}

export default EventLogistic
