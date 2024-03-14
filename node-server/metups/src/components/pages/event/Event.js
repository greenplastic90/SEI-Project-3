import { Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TitleAndHost from './components/TitleAndHost'
import LogisticsAndMap from './components/LogisticsAndMap'
import ImageAndDetails from './components/ImageAndDetails'
import RSVP from './components/RSVP'
import Attending from './components/Attending'
import CommentForm from './components/CommentForm'

const RSVP_HIEGHT = '80px'
function Event({ user, userGeoLocation, allEvents }) {
  const [event, setEvent] = useState(null)
  const [refreshEvent, setRefreshEvent] = useState(false)
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
  }, [allEvents, id, refreshEvent])
  return (
    <>
      {event && (
        <Stack pb={RSVP_HIEGHT}>
          <TitleAndHost event={event} />
          <LogisticsAndMap event={event} userGeoLocation={userGeoLocation} />
          <ImageAndDetails
            description={event.description}
            image={event.image}
            types={event.eventType}
          />

          <Attending attending={event.likedBy} />

          <RSVP event={event} setRefreshEvent={setRefreshEvent} hieght={RSVP_HIEGHT} />
          <CommentForm />
        </Stack>
      )}
    </>
  )
}

export default Event
