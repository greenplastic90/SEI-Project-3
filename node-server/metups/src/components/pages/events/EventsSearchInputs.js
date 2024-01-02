import { SearchIcon } from '@chakra-ui/icons'
import { HStack, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import React from 'react'

function EventsSearchInputs({ searchParams, onChange, options }) {
  return (
    <HStack spacing={0}>
      <InputGroup>
        <InputLeftElement borderLeftRadius={'md'} pointerEvents='none' bg={'brand.danger.500'}>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input
          pl={14}
          name='searchBar'
          defaultValue={searchParams.searchBar}
          onChange={onChange}
          placeholder='Search'
          borderRightRadius={0}
        />
      </InputGroup>
      <Select
        name='eventType'
        borderLeftRadius={0}
        borderLeft={0}
        placeholder='Event type'
        color={'gray.400'}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
    </HStack>
  )
}

export default EventsSearchInputs
