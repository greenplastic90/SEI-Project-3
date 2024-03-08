import { Stack } from '@chakra-ui/react'
import React from 'react'

function SectionWrapper({ children }) {
  return (
    <Stack spacing={4} pb={4} borderBottom={'1px solid'} borderBottomColor={'gray.200'}>
      {children}
    </Stack>
  )
}

export default SectionWrapper
