import { AspectRatio, HStack, Image, Stack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Info from './components/Info'

function SmallEventCard({ events }) {
  const navigate = useNavigate()
  return events.map((event) => (
    <Stack key={event._id}>
      {/* Stack of info/image */}
      <HStack
        onClick={() => navigate(`/events/${event._id}`)}
        cursor={'pointer'}
        justify='space-between'>
        <Info event={event} />
        {/* Image Stack */}
        <Stack>
          <AspectRatio w='100px' h='100px'>
            <Image src={event.image} alt='Event Hero' borderRadius={'md'} />
          </AspectRatio>
        </Stack>
      </HStack>
      <hr />
    </Stack>
  ))
}

export default SmallEventCard
