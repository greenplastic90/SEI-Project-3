import { Box } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineDeleteForever } from 'react-icons/md'

function DeleteComment({ handleDelete }) {
  return (
    <Box color={'brand.danger.400'} cursor={'pointer'} onClick={handleDelete}>
      <MdOutlineDeleteForever size={'25px'} />
    </Box>
  )
}

export default DeleteComment
