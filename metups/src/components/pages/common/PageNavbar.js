import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Importing authentication
import { userIsAuthenticated } from '../../../auth/helpers'

// Importing Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// import Container from 'react-bootstrap/Container'
import { Box, Button, Image, useToast, useColorMode } from '@chakra-ui/react'

const PageNavbar = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const { colorMode, toggleColorMode } = useColorMode()
  // This just gets rid of the token, logs the user out and directs them to the homepage
  const handleLogout = () => {
    window.localStorage.removeItem('metups-login-token')
    navigate('/')
  }

  return (
    <>
      <Box display={'flex'} bg={'#F8F4F2'}>
        <Navbar variant='light' expand='md' className='w-100'>
          <Navbar.Brand>
            <Nav.Item>
              <Link to='/'>
                {' '}
                <Image
                  src='https://res.cloudinary.com/dhpy1llxc/image/upload/v1645109533/SEI_61_PROJECT_3/Seeds%20Folder/LOGO.jpg'
                  alt='MetUps Logo'
                  boxSize={'150px'}
                />{' '}
              </Link>
            </Nav.Item>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-basic'
            className='justify-content-end gap-3 mx-4'
          >
            {userIsAuthenticated() ? (
              <>
                <Nav.Item>
                  <Link className='blockEffect' to='/events'>
                    Events
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className='blockEffect' to='/eventCreate'>
                    Create Event
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className='blockEffect' to='/profile'>
                    Profile
                  </Link>
                </Nav.Item>
                <Nav.Item onClick={handleLogout}>
                  <Link
                    onClick={() => {
                      toast({
                        title: 'Successfully Logged Out',
                        desc: 'You clicked log out',
                        status: 'success',
                        duration: '2000',
                        isClosable: true,
                      })
                    }}
                    to='/'
                    className='blockEffect'
                  >
                    Logout
                  </Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Link to='/register' className='blockEffect'>
                    Sign up
                  </Link>
                </Nav.Item>
                <Nav.Item className='blockEffect'>
                  <Link to='/login' className='blockEffect'>
                    Login
                  </Link>
                </Nav.Item>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Box>
    </>
  )
}

export default PageNavbar
