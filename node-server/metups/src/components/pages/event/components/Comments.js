import { Heading, Stack } from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import React from 'react'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { userIsAuthenticated } from '../../../../auth/helpers'
import SignInMessage from './SignInMessage'

function Comments({ comments, eventID, setRefreshEvent }) {
  const sortedComments = comments
    .slice()
    .sort((a, b) => parseISO(b.createdAt) - parseISO(a.createdAt))

  return (
    <Stack spacing={4}>
      <Heading variant='event'>Comments</Heading>
      {userIsAuthenticated() ? (
        <CommentForm eventID={eventID} setRefreshEvent={setRefreshEvent} />
      ) : (
        <SignInMessage />
      )}

      <Stack spacing={0}>
        {sortedComments.map((comment, i) => {
          const bgColor = i % 2 !== 0
          let position = ''
          if (i === 0) {
            position = 'top'
          }
          if (i === sortedComments.length - 1) {
            position = 'bottom'
          }

          return (
            <Comment key={comment._id} comment={comment} bgColor={bgColor} position={position} />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Comments
