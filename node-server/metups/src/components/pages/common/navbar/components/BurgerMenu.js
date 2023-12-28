import { CloseIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import Logo from './Logo'

import { RiGroupLine, RiHome3Line, RiLoginCircleLine, RiUserAddLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import BurgerItems from './BurgerItems'
import { userIsAuthenticated } from '../../../../../auth/helpers'

function BurgerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const iconRef = useRef()
  const navigate = useNavigate()
  const authenticatedItems = [
    { name: 'Home', func: () => navigateToPath('/'), icon: <RiHome3Line size={20} /> },
    { name: 'Events', func: () => navigateToPath('/events'), icon: <RiGroupLine size={20} /> },
  ]
  const UnauthenticatedItems = [
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
              <Logo />
              <SearchIcon boxSize={6} onClick={handleSearch} cursor={'pointer'} />
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            {userIsAuthenticated() ? (
              <BurgerItems items={authenticatedItems} />
            ) : (
              <BurgerItems items={UnauthenticatedItems} />
            )}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default BurgerMenu
