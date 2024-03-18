import { HStack } from '@chakra-ui/react'
import React from 'react'
import Commenter from './Commenter'
import CommentText from './CommentText'

function Comment({ comment, bgColor, position }) {
  return (
    <HStack align={'self-start'}>
      <Commenter username={comment.owner.username} image={comment.owner.profilePhoto} />
      <CommentText
        text={comment.text}
        createdAt={comment.createdAt}
        bgColor={bgColor}
        position={position}
      />
    </HStack>
  )
}

export default Comment
