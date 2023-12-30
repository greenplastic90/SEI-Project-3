import {
  Image,
  HStack,
  VStack,
  Stack,
  AspectRatio,
  Heading,
  Text,
  Grid,
  useBreakpointValue,
} from '@chakra-ui/react'
import React from 'react'
import { RiCalendarLine, RiCheckboxCircleLine } from 'react-icons/ri'
import { getDayOfWeek } from '../../../auth/helpers'
import { useNavigate } from 'react-router-dom'

function EventCards({ events }) {
  const navigate = useNavigate()
  const breakpointValue = useBreakpointValue({ base: 'base', md: 'md', lg: 'lg' })
  return (
    <Stack>
      <Heading>Events</Heading>
      <Grid
        templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)', null, null, 'repeat(4, 1fr)']}
        gap={4}>
        {events.map(({ _id, image, eventName, owner, eventTime, eventDate, likedBy }) => (
          <Stack key={_id}>
            <Stack
              onClick={() => navigate(`/events/${_id}`)}
              cursor={'pointer'}
              flexDir={['row', null, 'column-reverse']}
              justify={['space-between', null, 'start']}>
              <Stack>
                <Heading fontSize={'xl'} fontWeight={'bold'} pt={2}>
                  {eventName}
                </Heading>
                <Stack spacing={0}>
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
              </Stack>
              <Stack>
                <AspectRatio w={['100px', null, '250px']} h={['100px', null, '150px']}>
                  <Image src={image} alt='Event Hero' borderRadius={'md'} />
                </AspectRatio>
              </Stack>
            </Stack>
            {breakpointValue === 'base' && <hr />}
          </Stack>
        ))}
      </Grid>
    </Stack>
  )
}

export default EventCards
