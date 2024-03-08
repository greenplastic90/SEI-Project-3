import React from 'react'
import SectionWrapper from './SectionWrapper'
import Date from './Date'

function DateAndMap({ event }) {
  return (
    <SectionWrapper>
      <Date date={event.eventDate} time={event.eventTime} />
    </SectionWrapper>
  )
}

export default DateAndMap
