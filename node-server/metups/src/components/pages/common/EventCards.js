import { Image, HStack, VStack, Stack, AspectRatio, Heading, Text, Grid } from '@chakra-ui/react'
import React from 'react'
import { RiCalendarLine, RiCheckboxCircleLine } from 'react-icons/ri'
import { getDayOfWeek } from '../../../auth/helpers'
import { useNavigate } from 'react-router-dom'

function EventCards({ events }) {
  const navigate = useNavigate()
  return (
    <Stack>
      <Heading>Events</Heading>
      <Grid
        templateColumns={[
          'repeat(1, 1fr)',
          null,
          'repeat(3, 1fr)',
          'repeat(3, 1fr)',
          'repeat(3, 1fr)',
          'repeat(4, 1fr)',
        ]} // Adjust the number of columns based on the breakpoint
        gap={6}>
        {events.map(({ _id, image, eventName, owner, eventTime, eventDate, likedBy }) => (
          <Stack
            key={_id}
            onClick={() => navigate(`/events/${_id}`)}
            cursor={'pointer'}
            flexDir={['row', null, 'column-reverse']}
            justify={['space-between']}>
            <Stack>
              <Heading fontSize={'xl'}>{eventName}</Heading>
              <Text fontWeight={'black'} color={'blackAlpha.500'}>
                Hosted by: {owner.name}
              </Text>
              {/* Date */}
              <HStack>
                <RiCalendarLine size={20} />
                <Text>
                  {getDayOfWeek(eventDate)}, {eventDate} - {eventTime}
                </Text>
              </HStack>
              {/* Attending */}
              <HStack>
                <RiCheckboxCircleLine size={20} />
                <Text>{likedBy.length} going</Text>
              </HStack>
            </Stack>
            <AspectRatio w={['100px', null, '250px']} h={['100px', null, '150px']} ratio={5 / 3}>
              <Image src={image} alt='Event Hero' borderRadius={'md'} />
            </AspectRatio>
          </Stack>
        ))}
      </Grid>
    </Stack>
  )
}

export default EventCards
