import React from 'react'
import { getPayload, getTokenFromLocalStorage, userIsAuthenticated } from '../../../../auth/helpers'
import axios from 'axios'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function RSVP({ event, setRefreshEvent }) {
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
  return (
    <Button onClick={handleLikes} colorScheme='red'>
      RSVP
    </Button>
  )
}

export default RSVP
