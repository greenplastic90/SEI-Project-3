import { AspectRatio, HStack, Image, Stack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Info from './components/Info'
import DeleteEventButton from './components/DeleteEventButton'
import { userIsEventOwner } from '../../../../auth/helpers'

function SmallEventCard({ events, showDelete = false, fetchUserProfile }) {
  const navigate = useNavigate()

  return events.map((event) => {
    const showDeleteButton = showDelete && userIsEventOwner(event.owner)
    return (
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
        {showDeleteButton && (
          <DeleteEventButton eventID={event._id} fetchUserProfile={fetchUserProfile} />
        )}
        <hr />
      </Stack>
    )
  })
}

export default SmallEventCard
