import React from 'react'
import SectionWrapper from './SectionWrapper'
import { Heading, Image, Text } from '@chakra-ui/react'

function ImageAndDetails({ description, image }) {
  return (
    <SectionWrapper>
      <Image src={image} />
      <Heading fontSize={'xl'} fontWeight={'bold'}>
        Details
      </Heading>
      <Text>{description}</Text>
    </SectionWrapper>
  )
}

export default ImageAndDetails
