import { Input } from '@chakra-ui/react'
import React from 'react'

function EventsSearchInputs({ searchParams, onChange }) {
  return (
    <Input
      name='searchBar'
      defaultValue={searchParams.searchBar}
      onChange={onChange}
      placeholder='Search'
    />
  )
}

export default EventsSearchInputs
