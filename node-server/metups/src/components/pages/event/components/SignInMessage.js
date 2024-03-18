import { HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignInMessage() {
  const navigate = useNavigate()
  return (
    <HStack>
      <Text
        onClick={() => navigate('/login')}
        color='brand.primary.500'
        font
        fontWeight={'bold'}
        cursor={'pointer'}>
        Log in
      </Text>
      <Text>to leave a comment</Text>
    </HStack>
  )
}

export default SignInMessage
