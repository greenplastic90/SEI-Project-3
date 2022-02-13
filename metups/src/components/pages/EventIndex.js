import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

const EventIndex = ({ options, events }) => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useState({
    type: [],
    searchBar: '',
  })
  const [filteredEvents, setFilteredEvents] = useState([])

  useEffect(() => {
    const filtered = []
    events.forEach((event) =>
      searchParams.type.length === 0
        ? event.eventName
            .toLowerCase()
            .includes(searchParams.searchBar.toLowerCase()) &&
          filtered.push(event)
        : searchParams.type.some((type) => event.eventType.includes(type)) &&
          event.eventName
            .toLowerCase()
            .includes(searchParams.searchBar.toLowerCase()) &&
          filtered.push(event)
    )

    searchParams.type.length === 0 && searchParams.searchBar === ''
      ? setFilteredEvents(events)
      : setFilteredEvents(filtered)
  }, [events, searchParams])

  const handleChange = (e) => {
    if (!e.target) {
      const labels = e.map((obj) => obj.label)
      setSearchParams({ ...searchParams, type: labels })
    } else {
      setSearchParams({ ...searchParams, [e.target.name]: e.target.value })
    }
  }
  return (
    <section>
      <Container className='mt-5'>
        {/* Map is located here */}
        <h2 className='text-center'>MAP</h2>
        <h2>Search for an event</h2>
        <Form>
          <Form.Group>
            <Form.Label htmlFor='search bar'>Search</Form.Label>
            <Form.Control
              type='text'
              name='searchBar'
              defaultValue={searchParams.searchBar}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='event type'>Type of Event</Form.Label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={options}
              name='eventType'
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <Row>
          {events.length > 0 ? (
            filteredEvents.map((event) => {
              return (
                <Col md={4} className='mb-3' key={event._id}>
                  <Card>
                    <Card.Img variant='top' src={event.image} />
                    <Card.Body>
                      <Card.Title>{event.eventName}</Card.Title>
                      <Button
                        variant='primary'
                        onClick={() => navigate(`/events/${event._id}`)}
                      >
                        More Info
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          ) : (
            <Row className='justify-content-center'>
              {/* Need to figure out how to center it */}
              <Col md={6}>
                <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </Spinner>
              </Col>
            </Row>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default EventIndex
