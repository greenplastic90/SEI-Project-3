import React from 'react'
import SectionWrapper from './SectionWrapper'
import { Heading, Image, Text } from '@chakra-ui/react'
import EventTypes from './EventTypes'

function ImageAndDetails({ description, image, types }) {
  return (
    <SectionWrapper>
      <Image src={image} />
      <Heading fontSize={'xl'} fontWeight={'bold'}>
        Details
      </Heading>
      <Text>{description}</Text>
      <EventTypes types={types} />
    </SectionWrapper>
  )
}

export default ImageAndDetails
