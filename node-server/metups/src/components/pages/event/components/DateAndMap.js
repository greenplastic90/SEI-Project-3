import React from 'react'
import SectionWrapper from './SectionWrapper'
import Date from './Date'
import Map from './Map'

function DateAndMap({ event, userGeoLocation }) {
  return (
    <SectionWrapper>
      <Date date={event.eventDate} time={event.eventTime} />
      <Map
        userGeoLocation={userGeoLocation}
        longitude={event.longitude}
        latitude={event.latitude}
      />
    </SectionWrapper>
  )
}

export default DateAndMap
