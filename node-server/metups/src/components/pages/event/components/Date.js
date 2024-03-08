import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { MdQueryBuilder } from 'react-icons/md'
import { getDayOfWeek } from '../../../../auth/helpers'

function Date({ date, time }) {
  return (
    <HStack>
      <Box color={'gray.400'}>
        <MdQueryBuilder size={'25px'} />
      </Box>
      <Text fontSize={'sm'}>{`${getDayOfWeek(date)} ${date} at ${time}`}</Text>
    </HStack>
  )
}

export default Date
