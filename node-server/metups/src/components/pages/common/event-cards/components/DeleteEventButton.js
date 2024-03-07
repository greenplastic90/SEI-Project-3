import React from 'react'
import { getTokenFromLocalStorage } from '../../../../../auth/helpers'
import axios from 'axios'
import { Button } from '@chakra-ui/react'

function DeleteEventButton({ eventID, fetchUserProfile }) {
  const deleteEvent = async () => {
    try {
      const res = await axios.delete(`/api/events/${eventID}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      console.log(res)
      if (res.status === 204) {
        fetchUserProfile()
      }
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return (
    <Button colorScheme='brand.danger' onClick={deleteEvent}>
      Delete
    </Button>
  )
}

export default DeleteEventButton
