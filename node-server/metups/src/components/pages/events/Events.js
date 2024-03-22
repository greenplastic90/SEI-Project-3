import React, { useEffect, useState } from 'react'
import EventCards from '../common/EventCards'
import EventsMap from './EventsMap'
import { Heading, Stack } from '@chakra-ui/react'
import EventsSearchInputs from './EventsSearchInputs'
import { getRandomInRange } from '../../../auth/helpers'
import axios from 'axios'

function Events({ userGeoLocation, options }) {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [searchParams, setSearchParams] = useState({
    type: '',
    searchBar: '',
  })

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const { data } = await axios.get('/api/events/')

        const eventsWithUpdatedLocations = data.map((event) => {
          if (userGeoLocation && event.isDemo) {
            return {
              ...event,
              longitude: getRandomInRange(-0.12, 0.12) + userGeoLocation.longitude,
              latitude: getRandomInRange(-0.08, 0.08) + userGeoLocation.latitude,
            }
          }

          return event
        })

        setEvents(eventsWithUpdatedLocations)
      } catch (err) {
        console.log(err.response)
      }
    }
    getAllEvents()
  }, [userGeoLocation])

  useEffect(() => {
    const filtered = []
    events.forEach((event) =>
      searchParams.type.length === 0
        ? event.eventName.toLowerCase().includes(searchParams.searchBar.toLowerCase()) &&
          filtered.push(event)
        : event.eventType.includes(searchParams.type) &&
          //Below should replace above when using Reacr-Select again
          // searchParams.type.some((type) => event.eventType.includes(type))
          event.eventName.toLowerCase().includes(searchParams.searchBar.toLowerCase()) &&
          filtered.push(event)
    )

    searchParams.type.length === 0 && searchParams.searchBar === ''
      ? setFilteredEvents(events)
      : setFilteredEvents(filtered)
  }, [events, searchParams])

  const handleChange = (e) => {
    console.log(e)
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
    // Using React-Select
    // if (!e.target) {
    //   const labels = e.map((obj) => obj.label)
    //   setSearchParams({ ...searchParams, type: labels })
    // } else {
    //   setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
    // }
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
