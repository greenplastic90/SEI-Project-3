import { CloseIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import Logo from './Logo'

import { RiGroupLine, RiHome3Line, RiLoginCircleLine, RiUserAddLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import BurgerItems from './BurgerItems'
import { userIsAuthenticated } from '../../../../../auth/helpers'
import BurgerFooter from './BurgerFooter'

function BurgerMenu({ user, handleLogout }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const iconRef = useRef()
  const navigate = useNavigate()
  const authenticatedItems = [
    { name: 'Home', func: () => navigateToPath('/'), icon: <RiHome3Line size={20} /> },
    { name: 'Events', func: () => navigateToPath('/events'), icon: <RiGroupLine size={20} /> },
  ]
  const UnauthenticatedItems = [
    { name: 'Home', func: () => navigateToPath('/'), icon: <RiHome3Line size={20} /> },
    { name: 'Events', func: () => navigateToPath('/events'), icon: <RiGroupLine size={20} /> },
    { name: 'Log in', func: () => navigateToPath('/login'), icon: <RiLoginCircleLine size={20} /> },
    { name: 'Sign up', func: () => navigateToPath('/register'), icon: <RiUserAddLine size={20} /> },
  ]

  const handleSearch = () => {
    onClose()
    navigate('/events')
  }
  function navigateToPath(path) {
    onClose()
    navigate(path)
  }
  const logout = () => {
    handleLogout()
    navigate('/')
    onClose()
  }
  return (
    <>
      <HamburgerIcon ref={iconRef} boxSize={8} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        size={'full'}
        placement='right'
        onClose={onClose}
        finalFocusRef={iconRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <HStack justify={'space-between'}>
              <CloseIcon onClick={onClose} cursor={'pointer'} />
              <Box onClick={onClose}>
                <Logo />
              </Box>
              <SearchIcon boxSize={6} onClick={handleSearch} cursor={'pointer'} />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            {userIsAuthenticated() ? (
              <Stack spacing={8}>
                <BurgerItems items={authenticatedItems} />

                <Button
                  onClick={() => navigateToPath('/eventCreate')}
                  w={'full'}
                  colorScheme={'brand.primary'}>
                  Create a new event
                </Button>
              </Stack>
            ) : (
              <BurgerItems items={UnauthenticatedItems} />
            )}
          </DrawerBody>
          <hr />
          <DrawerFooter>
            {user && (
              <BurgerFooter
                user={user}
                profilePath={() => navigateToPath('/profile')}
                handleLogout={logout}
              />
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default BurgerMenu
