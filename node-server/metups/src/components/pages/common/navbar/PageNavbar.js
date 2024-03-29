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
    <HStack
      h={'70px'}
      pos={'fixed'}
      w={'full'}
      bgColor={'white'}
      as={'nav'}
      px={4}
      py={2}
      zIndex={'sticky'}
      justifyContent={'space-between'}
      borderBottom={'1px solid'}
      borderBottomColor={'gray.200'}>
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
