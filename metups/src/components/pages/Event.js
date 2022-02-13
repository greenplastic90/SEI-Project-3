import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

// Import helpers
import { getPayload, getTokenFromLocalStorage } from '../../auth/helpers'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const SingleEvent = () => {

  const navigate = useNavigate()
  const [ event, setEvent ] = useState('')
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  const { eventId } = useParams()

  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${eventId}`)
        console.log('SINGLE EVENT DATA HERE ->', data)
        setEvent(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getSingleEvent()
  }, [eventId])

  

  return(
  <>
  <h2>{event.eventName}</h2>

  <div>{event.description}</div>
  <div>{event.eventType}</div>
  <div>{event.locationName}</div>
  <div>{event.eventDate}</div>
  <div>{event.eventTime}</div>
  <div>{event.image}</div>
  </>
  
  )

}

export default SingleEvent
