import React from 'react'
import { userIsAuthenticated } from '../../../../auth/helpers'
import { HStack, useBreakpointValue } from '@chakra-ui/react'
import Logo from './components/Logo'
import AuthenticatedLinks from './components/AuthenticatedLinks'
import UnauthenticatedLinks from './components/UnauthenticatedLinks'
import BurgerMenu from './components/BurgerMenu'

const PageNavbar = ({ user, handleLogout }) => {
  const breakpointValue = useBreakpointValue({ base: 'base', md: 'md', lg: 'lg' })

  return (
    <HStack as={'nav'} p={4} justifyContent={'space-between'}>
      <Logo />

      {breakpointValue !== 'base' ? (
        <>
          {userIsAuthenticated() ? (
            <AuthenticatedLinks user={user} handleLogout={handleLogout} />
          ) : (
            <UnauthenticatedLinks />
          )}
        </>
      ) : (
        <BurgerMenu user={user} handleLogout={handleLogout} />
      )}
    </HStack>
  )
}

export default PageNavbar
