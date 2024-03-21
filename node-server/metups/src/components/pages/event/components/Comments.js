import { Heading, Stack } from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import React from 'react'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { getTokenFromLocalStorage, userIsAuthenticated } from '../../../../auth/helpers'
import SignInMessage from './SignInMessage'
import axios from 'axios'

function Comments({ comments, eventID, setRefreshEvent }) {
  const sortedComments = comments
    .slice()
    .sort((a, b) => parseISO(b.createdAt) - parseISO(a.createdAt))

  async function handleDelete(commentID) {
    try {
      const res = await axios.delete(
        `/api/events/${eventID}/comments/${commentID}`,

        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      )
      if (res.status === 204) {
        setRefreshEvent((state) => !state)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Stack spacing={4}>
      <Heading variant='event'>Comments</Heading>
      {userIsAuthenticated() ? (
        <CommentForm eventID={eventID} setRefreshEvent={setRefreshEvent} />
      ) : (
        <SignInMessage />
      )}

      <Stack>
        {sortedComments.map((comment) => (
          <Comment key={comment._id} comment={comment} handleDelete={handleDelete} />
        ))}
      </Stack>
    </Stack>
  )
}

export default Comments
