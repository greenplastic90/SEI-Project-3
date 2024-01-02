import React, { useEffect, useState } from 'react'
import EventCards from '../common/EventCards'
import EventsMap from './EventsMap'
import { Heading, Stack } from '@chakra-ui/react'
import EventsSearchInputs from './EventsSearchInputs'

function Events({ events, userGeoLocation, options }) {
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchParams, setSearchParams] = useState({
    type: [],
    searchBar: '',
  })

  useEffect(() => {
    const filtered = []
    events.forEach((event) =>
      searchParams.type.length === 0
        ? event.eventName.toLowerCase().includes(searchParams.searchBar.toLowerCase()) &&
          filtered.push(event)
        : searchParams.type.some((type) => event.eventType.includes(type)) &&
          event.eventName.toLowerCase().includes(searchParams.searchBar.toLowerCase()) &&
          filtered.push(event)
    )

    searchParams.type.length === 0 && searchParams.searchBar === ''
      ? setFilteredEvents(events)
      : setFilteredEvents(filtered)
  }, [events, searchParams])

  const handleChange = (e) => {
    console.log(e)
    if (!e.target) {
      const labels = e.map((obj) => obj.label)
      setSearchParams({ ...searchParams, type: labels })
    } else {
      setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
    }
  }

  return (
    <Stack spacing={8}>
      <Heading>Events</Heading>
      <EventsMap events={filteredEvents} userGeoLocation={userGeoLocation} />
      <EventsSearchInputs searchParams={searchParams} options={options} onChange={handleChange} />
      <EventCards events={filteredEvents} />
    </Stack>
  )
}

export default Events
