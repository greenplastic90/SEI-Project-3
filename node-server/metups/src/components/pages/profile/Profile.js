import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getTokenFromLocalStorage } from '../../../auth/helpers'
import { Box, HStack, Heading, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import BurgerFooter from '../common/navbar/components/BurgerFooter'
import ResetPasswordModal from './ResetPasswordModal'
import { useNavigate } from 'react-router-dom'
import EventCards from '../common/EventCards'
import ProfileImage from './ProfileImage'
import EventsCounter from './EventsCounter'

function Profile({ user, setUser, handleLogout }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [eventsToDisplay, setEventsToDisplay] = useState({ title: '', events: [] })
  const navigate = useNavigate()

  function logoutAndNavigate() {
    handleLogout()
    navigate('/')
  }
  useEffect(() => {
    if (!getTokenFromLocalStorage()) {
      navigate('/login')
    }
    try {
      const getUserProfile = async () => {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        setUser(data)
        if (data.ownedEvents.length) {
          setEventsToDisplay({ title: 'My Events', events: data.ownedEvents })
        } else if (data.likedEvents.length) {
          setEventsToDisplay({ title: 'RSVPs', events: data.likedEvents })
        }
      }
      getUserProfile()
    } catch (error) {
      console.log(error)
    }
  }, [navigate, setUser])
  return (
    <Stack px={[4, 40, 0]} flexDirection={['column', null, 'row']} spacing={[2, null, 0]}>
      <VStack>
        {user && (
          <>
            <VStack pb={4} justify={'space-between'} bgColor={'gray.100'} borderRadius={'xl'}>
              <ProfileImage user={user} />
              <EventsCounter user={user} />
            </VStack>

            <Box p={4} w={'350px'} borderRadius={'xl'} bgColor={'gray.100'}>
              <BurgerFooter
                user={user}
                action={'Password reset'}
                actionFunc={onOpen}
                handleLogout={logoutAndNavigate}
              />
            </Box>
          </>
        )}
        <ResetPasswordModal isOpen={isOpen} onClose={onClose} />
      </VStack>
      {eventsToDisplay.title && (
        <Stack p={4} bgColor={'gray.100'} borderRadius={'xl'}>
          <Heading>{eventsToDisplay.title}</Heading>
          <EventCards events={eventsToDisplay.events} />
        </Stack>
      )}
    </Stack>
  )
}

export default Profile
