import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'

function EventTypes({ types }) {
  return (
    <HStack wrap='wrap'>
      {types.map((type) => (
        <Box key={type} px={2} py={1} borderRadius={8} bgColor={'brand.primary.100'}>
          <Text fontWeight={'bold'} fontSize={'sm'}>
            {type}
          </Text>
        </Box>
      ))}
    </HStack>
  )
}

export default EventTypes
