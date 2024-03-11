import { HStack, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { RiCalendarLine, RiCheckboxCircleLine } from 'react-icons/ri'
import { getDayOfWeek } from '../../../../../auth/helpers'

function Info({ event }) {
  return (
    <Stack>
      <Heading fontSize={'xl'} fontWeight={'bold'} pt={2}>
        {event.eventName}
      </Heading>
      <Stack spacing={1}>
        {/* Owner */}
        <Text fontWeight={'black'} color={'blackAlpha.500'}>
          Hosted by: {event.owner.username}
        </Text>
        {/* Date */}
        <HStack>
          <RiCalendarLine size={20} />
          <Text>
            {getDayOfWeek(event.eventDate)}, {event.eventDate} - {event.eventTime}
          </Text>
        </HStack>
        {/* Attending */}
        <HStack>
          <RiCheckboxCircleLine size={20} />
          <Text fontSize={'lg'}>{event.likedBy.length} going</Text>
        </HStack>
      </Stack>
    </Stack>
  )
}

export default Info
