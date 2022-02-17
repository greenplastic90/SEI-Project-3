import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Importing authentication
import { userIsAuthenticated } from '../../../auth/helpers'

// Importing Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// import Container from 'react-bootstrap/Container'
import { Box, Button, Container, Image } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const PageNavbar = () => {
  const navigate = useNavigate()
  const toast = useToast()
  // This just gets rid of the token, logs the user out and directs them to the homepage
  const handleLogout = () => {
    window.localStorage.removeItem('metups-login-token')
    navigate('/')
  }

  return (
    <Box w={'100%'} maxH={'100%'} bg={'#F8F4F2'}>
      <Navbar variant='light' expand='md'>
        <Navbar.Brand>
          <Nav.Item>
            <Link to='/'> <Image src="https://res.cloudinary.com/dhpy1llxc/image/upload/v1645109533/SEI_61_PROJECT_3/Seeds%20Folder/LOGO.jpg" alt='MetUps Logo' maxH={'30%'} maxW={'30%'} /> </Link>
          </Nav.Item>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-basic' className='justify-content-end gap-4'>
          { userIsAuthenticated() ?
            <>
              <Nav.Item>
                <Link to='/events'>Events</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to='/eventCreate'>Create Event</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to='/profile'>Profile</Link>
              </Nav.Item>
              <Nav.Item onClick={handleLogout}>
                <Button onClick={() => {
                  toast({
                    title: "Successfully Logged Out",
                    desc: "You clicked log out",
                    status: "success",
                    duration: "2000",
                    isClosable: true
                  })
                }} className='clickable'>Logout</Button>
              </Nav.Item>
            </>
            :
            <>
              <Nav.Item>
                <Link to = '/register'>
                  <Button>
                    Register
                  </Button>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to = '/login'>
                  <Button>
                    Login
                  </Button>
                </Link>
              </Nav.Item>
            </>
          }
        </Navbar.Collapse>
      </Navbar>
    </Box>
  )
}

export default PageNavbar
