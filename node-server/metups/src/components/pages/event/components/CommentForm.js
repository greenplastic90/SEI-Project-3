import { Button, FormControl, HStack, Stack, Text, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getTokenFromLocalStorage } from '../../../../auth/helpers'

function CommentForm({ eventID, setRefreshEvent }) {
  const [comment, setComment] = useState({
    text: '',
  })
  const [limitExceeded, setLimitExceeded] = useState(false)

  useEffect(() => {
    if (comment.text.length > 250) {
      setLimitExceeded(true)
      return
    }
    setLimitExceeded(false)
  }, [comment])

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
          <HStack justifyContent={'space-between'}>
            <HStack
              fontSize={'sm'}
              color={'brand.secondary.400'}
              alignSelf={'self-start'}
              spacing={0}>
              <Text
                fontWeight={limitExceeded && 'bold'}
                color={limitExceeded && 'brand.danger.500'}>
                {comment.text.length}
              </Text>
              <Text>/250</Text>
            </HStack>
            <Button
              colorScheme='brand.primary'
              onClick={handleSubmit}
              disabled={limitExceeded || comment.text.length === 0}>
              Comment
            </Button>
          </HStack>
        </Stack>
      </FormControl>
    </Stack>
  )
}

export default CommentForm
