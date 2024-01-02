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
        onChange={onChange}
        name='type'
        borderLeftRadius={0}
        borderLeft={0}
        placeholder='Type'
        color={'gray.400'}>
        {options.map(({ value, label }) => (
          <option key={value} value={label}>
            {label}
          </option>
        ))}
      </Select>
    </HStack>
  )
}

export default EventsSearchInputs
