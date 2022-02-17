import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'

import { mapToken } from '../../config/enviroments.js'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import { Text } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { userIsAuthenticated } from '../../auth/helpers.js'

const EventIndex = ({ options, events, userGeoLocation }) => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useState({
    type: [],
    searchBar: '',
  })
  const [filteredEvents, setFilteredEvents] = useState([])
  const [showPopup, setShowPopup] = useState(true)

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

  if (!userIsAuthenticated) return

  return (
    <section>
      <Container className='py-5'>
        {userGeoLocation && (
          <>
            <Heading className='text-center mb-5' as='h1' size='3xl'>Events Near You</Heading>
            <Map
              initialViewState={{
                longitude: userGeoLocation.longitude,
                latitude: userGeoLocation.latitude,
                zoom: 11,
              }}
              style={{ height: 500 }}
              mapStyle='mapbox://styles/mapbox/streets-v11'
              mapboxAccessToken={mapToken}
              pitch={50}
              minZoom={11}
              maxZoom={13}
            >
              <NavigationControl visualizePitch={true} />
              {/* {filteredEvents.map((event) => {
                return (
                  <Popup
                    key={event._id}
                    longitude={event.longitude}
                    latitude={event.latitude}
                    onClose={() => setShowPopup(false)}
                    closeOnClick={false}
                  >
                    popup
                  </Popup>
                )
              })} */}
              {filteredEvents.map((event) => {
                return (
                  <Marker
                    key={event._id}
                    longitude={event.longitude}
                    latitude={event.latitude}
                    onClick={() => setShowPopup()}
                  ></Marker>
                )
              })}

              <Marker
                color='green'
                longitude={userGeoLocation.longitude}
                latitude={userGeoLocation.latitude}
              ></Marker>
            </Map>
          </>
        )}

        <Text className='mt-2 text-center' fontSize='3xl'>Search for an event</Text>
        <Form>
          <Form.Group>
            <Form.Label htmlFor='search bar'> <Text className='mt-2 text-center' fontSize='2xl'>Search</Text> </Form.Label>
            <Form.Control
              type='text'
              name='searchBar'
              defaultValue={searchParams.searchBar}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='event type'> <Text className='mt-2 text-center' fontSize='2xl'>Serach by type</Text></Form.Label>
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
