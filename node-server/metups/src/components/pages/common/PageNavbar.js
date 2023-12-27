import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Importing authentication
import { userIsAuthenticated } from '../../../auth/helpers'

// Importing Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// import Container from 'react-bootstrap/Container'
import { Box, Button, HStack, Image, Text, useToast } from '@chakra-ui/react'

const PageNavbar = () => {
  const navigate = useNavigate()
  const toast = useToast()

  // const { colorMode, toggleColorMode } = useColorMode()
  // This just gets rid of the token, logs the user out and directs them to the homepage
  const handleLogout = () => {
    window.localStorage.removeItem('metups-login-token')
    navigate('/')
  }

  return (
    <HStack justify={'space-between'}>
      <Link to='/'>METUPS</Link>
      <HStack>
        {userIsAuthenticated() ? (
          <>
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
          </>
        ) : (
          <>
            <Link to='/login'>Log in</Link>

            <Button onClick={() => navigate('/register')}>Sign up</Button>
          </>
        )}
      </HStack>
    </HStack>
  )
}

export default PageNavbar
