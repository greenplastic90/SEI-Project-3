import { Box } from '@chakra-ui/react'
import React from 'react'
import { MdLocationPin } from 'react-icons/md'
import { Map, Marker, NavigationControl } from 'react-map-gl'

function EventsMap({ events, userGeoLocation }) {
  return (
    <>
      {userGeoLocation && (
        <Map
          initialViewState={{
            longitude: userGeoLocation.longitude,
            latitude: userGeoLocation.latitude,
            zoom: 12,
          }}
          style={{ height: '50vh', borderRadius: '5px' }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
          // pitch={50}
          // minZoom={11}
          // maxZoom={13}
        >
          <NavigationControl visualizePitch={true} />

          {events.map((event) => {
            return (
              <Marker key={event._id} longitude={event.longitude} latitude={event.latitude}>
                <Box color={'brand.primary.500'}>
                  <MdLocationPin size={50} />
                </Box>
              </Marker>
            )
          })}

          <Marker longitude={userGeoLocation.longitude} latitude={userGeoLocation.latitude}>
            <Box color={'brand.danger.500'}>
              <MdLocationPin size={50} />
            </Box>
          </Marker>
        </Map>
      )}
    </>
  )
}

export default EventsMap
