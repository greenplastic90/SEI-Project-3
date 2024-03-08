import { Stack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleAndHost from './components/TitleAndHost'
import DateAndMap from './components/DateAndMap'

function Event({ user, userGeoLocation, allEvents }) {
  const [event, setEvent] = useState(null)
  const [comments, setComments] = useState({
    owner: '',
    text: '',
  })

  const { id } = useParams()

  // EVENTS API
  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        let { data } = await axios.get(`/api/events/${id}`)
        if (!data.isDemo) {
          setEvent(data)
          return
        }

        // Find updated location and update it.
        const eventWithUpdatedGeolocation = allEvents.find((event) => event._id === id)

        data = {
          ...data,
          longitude: eventWithUpdatedGeolocation.longitude,
          latitude: eventWithUpdatedGeolocation.latitude,
        }

        data.locationName = await getRealAddress(data.longitude, data.latitude)

        setEvent(data)

        async function getRealAddress(long, lat) {
          try {
            const { data } = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`
            )
            return data.features[0].place_name
          } catch (err) {
            console.log(err)
            return 'Street name unavilable'
          }
        }

        //? setLikedBy(data.likedBy)
      } catch (err) {
        //? setHasError({ error: true, message: err.message })
      }
    }
    getSingleEvent()
  }, [allEvents, id])
  return (
    <>
      {event && (
        <Stack>
          <TitleAndHost event={event} />
          <DateAndMap event={event} />
        </Stack>
      )}
    </>
  )
}

export default Event
