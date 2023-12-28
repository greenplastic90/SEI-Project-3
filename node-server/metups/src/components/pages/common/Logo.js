import { Text, VStack } from '@chakra-ui/react'
import React from 'react'

function Logo() {
  return (
    <VStack bg={'brand.danger.500'} py={2} px={6} borderRadius={'full'}>
      <Text
        color={'white'}
        fontSize={['large', 'x-large']}
        fontFamily={'Gloria Hallelujah, cursive'}>
        METUPS
      </Text>
    </VStack>
  )
}

export default Logo
