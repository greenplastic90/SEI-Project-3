import { HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

function BurgerItems({ items }) {
  return (
    <Stack spacing={6}>
      {items.map((item) => (
        <HStack key={item.name} onClick={item.func} cursor={'pointer'} justify={'space-between'}>
          <Text fontWeight={'bold'}>{item.name}</Text>
          {item.icon}
        </HStack>
      ))}
    </Stack>
  )
}

export default BurgerItems
