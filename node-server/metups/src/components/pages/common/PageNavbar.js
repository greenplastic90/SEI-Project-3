import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Importing authentication
import { userIsAuthenticated } from '../../../auth/helpers'

// import Container from 'react-bootstrap/Container'
import { Button, HStack, Text, Avatar } from '@chakra-ui/react'

const PageNavbar = ({ user }) => {
  const navigate = useNavigate()
  console.log(user)

  const handleLogout = () => {
    window.localStorage.removeItem('metups-login-token')
    navigate('/')
  }

  return (
    <HStack as={'nav'} justify={'space-between'}>
      <Link to='/'>METUPS</Link>

      {userIsAuthenticated() ? (
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

          {/* <Button colorScheme='brand.primary' onClick={handleLogout}>
            Log out
          </Button> */}
        </HStack>
      ) : (
        <HStack spacing={4}>
          <Text variant='navLink' onClick={() => navigate('/login')}>
            Log in
          </Text>

          <Button colorScheme='brand.primary' onClick={() => navigate('/register')}>
            Sign up
          </Button>
        </HStack>
      )}
    </HStack>
  )
}

export default PageNavbar
