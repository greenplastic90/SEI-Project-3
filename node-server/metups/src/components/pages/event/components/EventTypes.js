import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'

function EventTypes({ types }) {
  return (
    <HStack wrap='wrap' spacing={0} justify={'space-between'}>
      {types.map((type) => (
        <Box key={type} px={2} py={1} borderRadius={5} bgColor={'brand.primary.100'}>
          <Text fontSize={'sm'}>{type}</Text>
        </Box>
      ))}
    </HStack>
  )
}

export default EventTypes
