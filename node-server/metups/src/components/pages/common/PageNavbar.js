import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Importing authentication
import { userIsAuthenticated } from '../../../auth/helpers'

// import Container from 'react-bootstrap/Container'
import { Button, HStack, Text } from '@chakra-ui/react'

const PageNavbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('metups-login-token')
    navigate('/')
  }

  return (
    <HStack justify={'space-between'}>
      <Link to='/'>METUPS</Link>
      <HStack>
        {userIsAuthenticated() ? (
          <HStack spacing={4}>
            <Link className='blockEffect' to='/events'>
              Events
            </Link>

            <Link className='blockEffect' to='/eventCreate'>
              Create Event
            </Link>

            <Link className='blockEffect' to='/profile'>
              Profile
            </Link>

            <Link
              onClick={() => {
                handleLogout()
              }}
              to='/'
              className='blockEffect'>
              Logout
            </Link>
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
    </HStack>
  )
}

export default PageNavbar
