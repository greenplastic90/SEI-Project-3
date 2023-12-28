import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

function BurgerItems({ items }) {
  return (
    <Stack spacing={6}>
      {items.map((item) => (
        <HStack key={item.name} onClick={item.func} cursor={'pointer'} justify={'space-between'}>
          <Text fontWeight={'bold'}>{item.name}</Text>
          <Box color={'blackAlpha.500'}>{item.icon}</Box>
        </HStack>
      ))}
    </Stack>
  )
}

export default BurgerItems
