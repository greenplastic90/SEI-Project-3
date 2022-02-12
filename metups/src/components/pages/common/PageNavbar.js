import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Importing authentication
import { userIsAuthenticated } from '../../../auth/helpers'

// Importing Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

const PageNavbar = () => {
  const navigate = useNavigate()
  // This just gets rid of the token, logs the user out and directs them to the homepage
  const handleLogout = () => {
    window.localStorage.removeItem('metups-login-token')
    navigate('/')
  }

  return (
    <>
      <Navbar>
        <Container fluid>
          {/* changing href <Link> as href causes reload */}

          <Navbar.Brand>
            <Link to='/'> METUPS</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse className='justify-content-end'>
            {/* commented out -> causing UserIsauthenticated issues -> Buffer is not definied error*/}

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
                  <span className='clickable'>Logout</span>
                </Nav.Item>
              </>
              :
              <>
                <Nav.Item>
                  <Link to = '/register'>Register</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to = '/login'>Login</Link>
                </Nav.Item>
              </>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default PageNavbar
