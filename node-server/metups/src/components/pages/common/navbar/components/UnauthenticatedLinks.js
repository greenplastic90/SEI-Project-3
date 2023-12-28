import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function UnauthenticatedLinks() {
  const navigate = useNavigate()
  return (
    <HStack spacing={4}>
      <Text variant='navLink' onClick={() => navigate('/events')}>
        Events
      </Text>
      <Text variant='navLink' onClick={() => navigate('/login')}>
        Log in
      </Text>

      <Button colorScheme='brand.primary' onClick={() => navigate('/register')}>
        Sign up
      </Button>
    </HStack>
  )
}

export default UnauthenticatedLinks
