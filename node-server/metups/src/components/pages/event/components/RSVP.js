import React from 'react'
import { getPayload, getTokenFromLocalStorage, userIsAuthenticated } from '../../../../auth/helpers'
import axios from 'axios'
import { Button, HStack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function RSVP({ event, setRefreshEvent, hieght }) {
  const hasRSVPed = event.likedBy.find((user) => user.owner._id === getPayload().sub)
  const navigate = useNavigate()
  const handleLikes = async () => {
    if (!userIsAuthenticated()) {
      navigate('/login')
      return
    }

    try {
      const res = await axios.put(
        `/api/events/${event._id}/user/${getPayload().sub}/likes`,
        {},

        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      if (res.status === 202) {
        setRefreshEvent((status) => !status)
      }
    } catch (err) {
      console.log(err.response)
    }
  }
  const attendingNumber = event.likedBy.length
  return (
    <HStack
      w={'full'}
      h={hieght}
      bgColor={'white'}
      justify={'space-between'}
      py={4}
      px={8}
      pos={'fixed'}
      bottom={0}
      left={0}>
      <Text fontSize={'lg'} fontWeight={'bold'}>{`${attendingNumber} Attending`}</Text>
      <Button
        w={'150px'}
        onClick={handleLikes}
        colorScheme={hasRSVPed ? 'brand.secondary' : 'brand.danger'}>
        {hasRSVPed ? 'Cancel RSVP' : 'RSVP'}
      </Button>
    </HStack>
  )
}

export default RSVP
