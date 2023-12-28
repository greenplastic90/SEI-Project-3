import { Stack } from '@chakra-ui/react'
import React from 'react'

function PageWrapper({ children }) {
  return <Stack pt={20}>{children}</Stack>
}

export default PageWrapper
