import React from 'react'
import SectionWrapper from './SectionWrapper'
import { Image } from '@chakra-ui/react'

function ImageAndDetails({ description, image }) {
  return (
    <SectionWrapper>
      <Image src={image} />
    </SectionWrapper>
  )
}

export default ImageAndDetails
