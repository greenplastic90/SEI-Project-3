import React from 'react'
import { userIsAuthenticated } from '../../../../auth/helpers'
import { HStack, useBreakpointValue } from '@chakra-ui/react'
import Logo from './components/Logo'
import AuthenticatedLinks from './components/AuthenticatedLinks'
import UnauthenticatedLinks from './components/UnauthenticatedLinks'
import BurgerMenu from './components/BurgerMenu'

const PageNavbar = ({ user }) => {
  const breakpointValue = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' })

  return (
    <HStack as={'nav'} justifyContent={'space-between'}>
      <Logo />

      {breakpointValue !== 'base' ? (
        <>{userIsAuthenticated() ? <AuthenticatedLinks user={user} /> : <UnauthenticatedLinks />}</>
      ) : (
        <BurgerMenu />
      )}
    </HStack>
  )
}

export default PageNavbar
