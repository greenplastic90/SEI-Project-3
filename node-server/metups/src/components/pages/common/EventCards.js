import { Stack, Text, Grid, VStack, useBreakpoint } from '@chakra-ui/react'
import React from 'react'
import LargeEventCard from './event-cards/LargeEventCard'
import SmallEventCard from './event-cards/SmallEventCard'

function EventCards({ events }) {
  const breakpoint = useBreakpoint()

  return (
    <Stack>
      {events.length > 0 ? (
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            null,
            'repeat(2, 1fr)',
            null,
            'repeat(3, 1fr)',
            'repeat(4, 1fr)',
          ]}
          gap={4}>
          {['base', 'sm'].includes(breakpoint) ? (
            <SmallEventCard events={events} />
          ) : (
            <LargeEventCard events={events} />
          )}
        </Grid>
      ) : (
        <VStack pt={8}>
          <Text>No events</Text>
        </VStack>
      )}
    </Stack>
  )
}

export default EventCards
