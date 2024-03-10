import { Heading } from '@chakra-ui/react'
import React from 'react'
import Host from './Host'
import SectionWrapper from './SectionWrapper'

function TitleAndHost({ event }) {
  return (
    <SectionWrapper spacing={4} pb={4} borderBottom={'1px solid'} borderBottomColor={'gray.200'}>
      <Heading fontWeight={'bold'}>{event.eventName}</Heading>
      <Host owner={event.owner} />
    </SectionWrapper>
  )
}

export default TitleAndHost
