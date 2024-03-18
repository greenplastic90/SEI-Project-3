import { Button, FormControl, Stack, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { getTokenFromLocalStorage } from '../../../../auth/helpers'

function CommentForm({ eventID, setRefreshEvent }) {
  const [comment, setComment] = useState({
    text: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`/api/events/${eventID}/comments`, comment, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      if (res.status === 201) {
        setComment({ text: '' })
        setRefreshEvent((state) => !state)
      }
    } catch (err) {
      console.log(err.response)
    }
  }

  function handleChange(e) {
    setComment({ text: e.target.value })
  }

  return (
    <Stack>
      <FormControl>
        <Stack>
          <Textarea
            onChange={handleChange}
            name='text'
            value={comment.text}
            placeholder='Add a comment'
          />
          <Button colorScheme='brand.primary' alignSelf={'end'} onClick={handleSubmit}>
            Comment
          </Button>
        </Stack>
      </FormControl>
    </Stack>
  )
}

export default CommentForm
