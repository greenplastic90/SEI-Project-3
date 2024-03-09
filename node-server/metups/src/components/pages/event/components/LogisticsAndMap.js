import React from 'react'
import SectionWrapper from './SectionWrapper'
import Map from './Map'
import { getDayOfWeek } from '../../../../auth/helpers'
import EventLogistic from './EventLogistic'
import { MdQueryBuilder } from 'react-icons/md'
import { MdLocationPin } from 'react-icons/md'

function LogisticsAndMap({ event, userGeoLocation }) {
  const ICON_SIZE = '25px'
  return (
    <SectionWrapper>
      <EventLogistic
        icon={<MdQueryBuilder size={ICON_SIZE} />}
        text={`${getDayOfWeek(event.eventDate)} ${event.eventDate} at ${event.eventTime}`}
      />
      <EventLogistic icon={<MdLocationPin size={ICON_SIZE} />} text={event.locationName} />
      <Map
        userGeoLocation={userGeoLocation}
        longitude={event.longitude}
        latitude={event.latitude}
      />
    </SectionWrapper>
  )
}

export default LogisticsAndMap
