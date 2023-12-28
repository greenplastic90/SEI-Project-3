import { Text, Stack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logo() {
  const navigate = useNavigate()
  return (
    <Stack
      onClick={() => navigate('/')}
      cursor={'pointer'}
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
