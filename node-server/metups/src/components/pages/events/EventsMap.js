import React from 'react'
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
          style={{ height: 500 }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
          // pitch={50}
          // minZoom={11}
          // maxZoom={13}
        >
          <NavigationControl visualizePitch={true} />

          {events.map((event) => {
            return <Marker key={event._id} longitude={event.longitude} latitude={event.latitude} />
          })}

          <Marker
            color='green'
            longitude={userGeoLocation.longitude}
            latitude={userGeoLocation.latitude}
          />
        </Map>
      )}
    </>
  )
}

export default EventsMap
