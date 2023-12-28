import { Avatar, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AuthenticatedLinks({ user }) {
  const navigate = useNavigate()
  // const handleLogout = () => {
  //   window.localStorage.removeItem('metups-login-token')
  //   navigate('/')
  // }
  return (
    <HStack spacing={4}>
      <Text variant='createEventNavLink' onClick={() => navigate('/eventCreate')}>
        Create a new event
      </Text>
      <Text variant='navLink' onClick={() => navigate('/events')}>
        Events
      </Text>

      {user && (
        <Avatar
          bg={'brand.danger.500'}
          cursor={'pointer'}
          name={user.username}
          src={user.profilePhoto}
          onClick={() => navigate('/profile')}
        />
      )}
      {/* <Button onClick={handleLogout}>Log out</Button> */}
    </HStack>
  )
}

export default AuthenticatedLinks
