import React from 'react'
import { useNavigate } from 'react-router-dom'

// Importing authentication
import { userIsAuthenticated } from '../../../../auth/helpers'

// import Container from 'react-bootstrap/Container'
import { Button, HStack, Text, Avatar, useBreakpointValue } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Logo from './components/Logo'
import AuthenticatedLinks from './components/AuthenticatedLinks'
import UnauthenticatedLinks from './components/UnauthenticatedLinks'

const PageNavbar = ({ user }) => {
  const breakpointValue = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' })
  const navigate = useNavigate()

  return (
    <HStack as={'nav'} justify={'space-between'}>
      <Logo />

      {breakpointValue !== 'base' ? (
        <>{userIsAuthenticated() ? <AuthenticatedLinks user={user} /> : <UnauthenticatedLinks />}</>
      ) : (
        <HamburgerIcon boxSize={8} />
      )}
    </HStack>
  )
}

export default PageNavbar
