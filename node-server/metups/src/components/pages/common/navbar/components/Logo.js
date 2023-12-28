import { Text, Stack } from '@chakra-ui/react'
import React from 'react'

function Logo() {
  return (
    <Stack
      bg={'brand.danger.500'}
      py={2}
      px={6}
      borderRadius={'full'}
      align={'center'}
      w={'fit-content'}>
      <Text
        color={'white'}
        fontSize={['large', 'x-large']}
        fontFamily={'Gloria Hallelujah, cursive'}
        fontWeight={'bold'}>
        METUPS
      </Text>
    </Stack>
  )
}

export default Logo
