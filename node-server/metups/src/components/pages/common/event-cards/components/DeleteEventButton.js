import React from 'react'
import { getTokenFromLocalStorage } from '../../../../../auth/helpers'
import axios from 'axios'
import { Button } from '@chakra-ui/react'

function DeleteEventButton({ eventID }) {
  const deleteEvent = async () => {
    try {
      const { data } = await axios.delete(`/api/events/${eventID}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
    } catch (err) {
      console.log(err.response.data)
    }

    // try {
    //   const getUserProfile = async () => {
    //     const { data } = await axios.get('/api/profile', {
    //       headers: {
    //         Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    //       },
    //     })

    //     setUser(data)
    //   }
    //   getUserProfile()
    // } catch (error) {
    //   console.log(error)
    // }
  }
  return (
    <Button colorScheme='brand.danger' onClick={deleteEvent}>
      Delete
    </Button>
  )
}

export default DeleteEventButton
