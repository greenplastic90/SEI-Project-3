import React from 'react'
import MapGl, { Marker } from 'react-map-gl'
import { MdLocationPin } from 'react-icons/md'
import { Box } from '@chakra-ui/react'

function Map({ userGeoLocation, longitude, latitude }) {
  return (
    <>
      {userGeoLocation && (
        <MapGl
          key={`${longitude}-${latitude}`}
          initialViewState={{
            longitude: longitude,
            latitude: latitude,
            zoom: 13,
          }}
          style={{ height: 200 }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}>
          <Marker longitude={longitude} latitude={latitude}>
            <Box color={'brand.primary.500'}>
              <MdLocationPin size={50} />
            </Box>
          </Marker>
        </MapGl>
      )}
    </>
  )
}

export default Map
