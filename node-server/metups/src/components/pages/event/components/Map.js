import React from 'react'
import MapGl, { Marker } from 'react-map-gl'

function Map({ userGeoLocation, longitude, latitude }) {
  console.log(latitude)
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
          <Marker color='green' longitude={longitude} latitude={latitude}></Marker>
        </MapGl>
      )}
    </>
  )
}

export default Map
