import { SearchIcon } from '@chakra-ui/icons'
import { HStack, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import React from 'react'

function EventsSearchInputs({ searchParams, onChange }) {
  return (
    <HStack spacing={0}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input
          name='searchBar'
          defaultValue={searchParams.searchBar}
          onChange={onChange}
          placeholder='Search'
          borderRightRadius={0}
        />
      </InputGroup>
      <Select
        borderLeftRadius={0}
        borderLeft={0}
        placeholder='Event type'
        color={'gray.400'}></Select>
    </HStack>
  )
}

export default EventsSearchInputs
