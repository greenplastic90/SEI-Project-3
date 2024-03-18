import { Heading, Stack } from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import React from 'react'
import CommentForm from './CommentForm'
import Comment from './Comment'

function Comments({ comments, eventID, setRefreshEvent }) {
  const sortedComments = comments
    .slice()
    .sort((a, b) => parseISO(b.createdAt) - parseISO(a.createdAt))

  return (
    <Stack spacing={4}>
      <Heading variant='event'>Comments</Heading>
      <CommentForm eventID={eventID} setRefreshEvent={setRefreshEvent} />

      <Stack>
        {sortedComments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </Stack>
    </Stack>
  )
}

export default Comments
