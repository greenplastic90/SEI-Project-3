import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { getTokenFromLocalStorage } from '../../../auth/helpers'
import {
  Box,
  Grid,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  useBreakpoint,
  useDisclosure,
} from '@chakra-ui/react'
import BurgerFooter from '../common/navbar/components/BurgerFooter'
import ResetPasswordModal from './ResetPasswordModal'
import { useNavigate } from 'react-router-dom'
import ProfileImage from './ProfileImage'
import EventsCounter from './EventsCounter'
import SmallEventCard from '../common/event-cards/SmallEventCard'
import LargeEventCard from '../common/event-cards/LargeEventCard'

const smallCardBreakpoints = ['base', 'sm']

function Profile({ user, setUser, handleLogout }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [eventsToDisplay, setEventsToDisplay] = useState({ title: 'My Events', events: [] })
  const navigate = useNavigate()
  const breakpoint = useBreakpoint()

  function logoutAndNavigate() {
    handleLogout()
    navigate('/')
  }
  const eventsSwitch = useCallback(
    (title) => {
      switch (title) {
        case 'My Events':
          setEventsToDisplay({ title: 'My Events', events: user.ownedEvents })
          break
        case 'RSVPs':
          setEventsToDisplay({ title: 'RSVPs', events: user.likedEvents })
          break
        default:
      }
    },
    [setEventsToDisplay, user]
  )
  const fetchUserProfile = useCallback(async () => {
    if (!getTokenFromLocalStorage()) {
      navigate('/login')
      return
    }

    try {
      const { data } = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })

      setUser(data)
      setEventsToDisplay({ title: 'My Events', events: data.ownedEvents })
    } catch (error) {
      console.log(error)
    }
  }, [navigate, setUser])

  useEffect(() => {
    fetchUserProfile()
  }, [fetchUserProfile])

  return (
    <VStack spacing={6}>
      {user && (
        <>
          {!smallCardBreakpoints.includes(breakpoint) ? (
            <HStack w={'full'} justify={'space-around'} align={'start'} spacing={6}>
              <ImageAndEvents
                user={user}
                eventsSwitch={eventsSwitch}
                eventsToDisplay={eventsToDisplay}
                onOpen={onOpen}
                logoutAndNavigate={logoutAndNavigate}
                isOpen={isOpen}
                onClose={onClose}
                fetchUserProfile={fetchUserProfile}
              />
            </HStack>
          ) : (
            <Stack>
              <ImageAndEvents
                user={user}
                eventsSwitch={eventsSwitch}
                eventsToDisplay={eventsToDisplay}
                onOpen={onOpen}
                logoutAndNavigate={logoutAndNavigate}
                isOpen={isOpen}
                onClose={onClose}
                fetchUserProfile={fetchUserProfile}
              />
            </Stack>
          )}
        </>
      )}
    </VStack>
  )
}

export default Profile

function ImageAndEvents({
  user,
  eventsSwitch,
  eventsToDisplay,
  onOpen,
  logoutAndNavigate,
  isOpen,
  onClose,
  fetchUserProfile,
}) {
  const breakpoint = useBreakpoint()

  return (
    <>
      <Stack>
        <ImageAndCounter user={user} eventsSwitch={eventsSwitch} />
        {/* show ProfileFooter below ImageAndCounter if Eevnts are going to be right of ImageAndCounter */}
        {!smallCardBreakpoints.includes(breakpoint) && (
          <ProfileFooter
            user={user}
            onOpen={onOpen}
            logoutAndNavigate={logoutAndNavigate}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </Stack>

      {eventsToDisplay.title && (
        // 350 is the width of the VStack above
        <Stack borderRadius={'xl'} maxW={'350'}>
          <Heading>{eventsToDisplay.title}</Heading>
          {eventsToDisplay.events.length !== 0 ? (
            smallCardBreakpoints.includes(breakpoint) ? (
              <SmallEventCard
                events={eventsToDisplay.events}
                showDelete={true}
                fetchUserProfile={fetchUserProfile}
              />
            ) : (
              <Grid
                templateColumns={[
                  null,
                  null,
                  null,
                  'repeat(1, 1fr)',
                  'repeat(2, 1fr)',
                  null,
                  'repeat(3, 1fr)',
                ]}
                gap={4}>
                <LargeEventCard
                  events={eventsToDisplay.events}
                  showDelete={true}
                  fetchUserProfile={fetchUserProfile}
                />
              </Grid>
            )
          ) : (
            <VStack>
              <Text>No Events</Text>
            </VStack>
          )}
        </Stack>
      )}

      {/* show ProfileFooter below Events if Eevnts are going to be below ImageAndCounter */}
      {smallCardBreakpoints.includes(breakpoint) && (
        <ProfileFooter
          user={user}
          onOpen={onOpen}
          logoutAndNavigate={logoutAndNavigate}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  )
}
function ImageAndCounter({ user, eventsSwitch }) {
  return (
    <VStack pb={4} justify={'space-between'} bgColor={'gray.100'} borderRadius={'xl'}>
      <ProfileImage user={user} />
      <EventsCounter user={user} action={eventsSwitch} />
    </VStack>
  )
}
function ProfileFooter({ user, onOpen, logoutAndNavigate, isOpen, onClose }) {
  return (
    <>
      <Box p={4} w={'350px'} borderRadius={'xl'} bgColor={'gray.100'}>
        <BurgerFooter
          user={user}
          action={'Password reset'}
          actionFunc={onOpen}
          handleLogout={logoutAndNavigate}
        />
      </Box>
      <ResetPasswordModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
