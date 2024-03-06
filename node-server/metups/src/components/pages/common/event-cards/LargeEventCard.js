import { AspectRatio, Image, Stack } from '@chakra-ui/react'
import React from 'react'

import { useNavigate } from 'react-router-dom'

import Info from './components/Info'

function LargeEventCard({ events }) {
  const navigate = useNavigate()
  return events.map((event) => (
    <Stack key={event._id}>
      {/* Stack of info/image */}
      <Stack
        onClick={() => navigate(`/events/${event._id}`)}
        cursor={'pointer'}
        flexDir={'column-reverse'}
        justify={'start'}>
        <Info event={event} />
        {/* Image Stack */}
        <Stack>
          <AspectRatio w='250px' h='150px'>
            <Image src={event.image} alt='Event Hero' borderRadius={'md'} />
          </AspectRatio>
        </Stack>
      </Stack>
    </Stack>
  ))
}

export default LargeEventCard
