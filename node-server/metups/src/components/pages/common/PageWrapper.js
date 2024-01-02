import { Stack } from '@chakra-ui/react'
import React from 'react'

function PageWrapper({ children }) {
  return <Stack pt={0}>{children}</Stack>
}

export default PageWrapper
