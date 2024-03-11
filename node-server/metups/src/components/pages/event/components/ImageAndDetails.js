import React from 'react'
import SectionWrapper from './SectionWrapper'
import { Heading, Image, Text } from '@chakra-ui/react'
import EventTypes from './EventTypes'

function ImageAndDetails({ description, image, types }) {
  return (
    <SectionWrapper>
      <Image maxH='500px' maxW='100%' src={image} objectFit='contain' />
      <Heading fontSize={'xl'} fontWeight={'bold'}>
        Details
      </Heading>
      <Text>{description}</Text>
      <EventTypes types={types} />
    </SectionWrapper>
  )
}

export default ImageAndDetails
