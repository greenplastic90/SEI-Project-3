import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Map, { Marker } from 'react-map-gl'

// Import helpers
import { getTokenFromLocalStorage, userIsAuthenticated } from '../../auth/helpers'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
// Import Chakra Components
import { Box, Image, Wrap, WrapItem } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Table, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'

const SingleEvent = ({ user, userGeoLocation, allEvents }) => {
  const [event, setEvent] = useState(null)
  const [updatedEventLocation, setUpdatedEventLocation] = useState(null)
  const [hasError, setHasError] = useState({ error: false, message: '' })
  const [comments, setComments] = useState({
    owner: '',
    text: '',
  })

  const [likedBy, setLikedBy] = useState([])

  const { id } = useParams()

  // EVENTS API
  useEffect(() => {
    const getSingleEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${id}`)
        setLikedBy(data.likedBy)
        setEvent(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getSingleEvent()
  }, [id])

  // update event.locationName api
  useEffect(() => {
    if (event && !event.isDemo) {
      setUpdatedEventLocation({
        longitude: event.longitude,
        latitude: event.latitude,
        locationName: event.locationName,
      })
    } else {
      event &&
        allEvents.forEach((item) => {
          const getRealAddress = async (long, lat) => {
            try {
              const { data } = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`
              )
              setUpdatedEventLocation({
                longitude: item.longitude,
                latitude: item.latitude,
                locationName: data.features[0].place_name,
              })
            } catch (err) {
              console.log(err)
            }
          }

          if (item._id === event._id) {
            getRealAddress(item.longitude, item.latitude)
          }
        })
    }
  }, [event, allEvents])

  // LIKES API
  const handleLikes = async (e) => {
    e.preventDefault()
    const hasLiked = likedBy.some((like) => user._id === like.owner._id)

    const updatedLikedByArray = likedBy
    if (hasLiked) {
      updatedLikedByArray.forEach((like, i) => {
        if (user._id === like.owner._id) {
          updatedLikedByArray.splice(i, 1)
        }
      })
    }
    if (!hasLiked) {
      updatedLikedByArray.push({ owner: user })
    }
    try {
      await axios.put(
        `/api/events/${id}/likes`,
        { likedBy: updatedLikedByArray },
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      const getSingleEvent = async () => {
        try {
          const { data } = await axios.get(`/api/events/${id}`)
          setEvent(data)
        } catch (err) {
          setHasError({ error: true, message: err.message })
        }
      }
      getSingleEvent()
    } catch (err) {
      console.log(err.response)
    }
  }

  // HANDLECHANGE AND SUBMIT FOR COMMENT
  const handleChange = (e) => {
    if (e.target) {
      const newObj = { ...comments, [e.target.name]: e.target.value }
      setComments(newObj)
    } else {
      const arrayOfValues = e.map((comments) => {
        return comments.owner.username
      })
      const newValue = { ...comments, text: arrayOfValues }
      setComments(newValue)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/events/${id}/comments`, comments, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      setComments({ ...comments, text: '' })
      const getSingleEvent = async () => {
        try {
          const { data } = await axios.get(`/api/events/${id}`)
          setEvent(data)
        } catch (err) {
          setHasError({ error: true, message: err.message })
        }
      }
      getSingleEvent()
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <>
      <section>
        {event && updatedEventLocation ? (
          <Container className='pt-5 mx-9000'>
            <Row>
              <Col md={12} className='imgWidth'>
                {/* EVENT IMAGE AND EVENT NAME*/}
                <Image
                  className='img-fluid shadow-2-strong'
                  src={event.image}
                  alt='event image'
                  width={'full'}
                />
              </Col>
              <Col md={12} className='my-3'>
                <Heading textAlign={'center'} mb={3}>
                  {event.eventName}
                </Heading>
              </Col>
              {event.owner ? (
                // Col for all info of event owner and event info
                <Col md={12} className='mb-3'>
                  <Row>
                    <Col md={6}>
                      {/* Description */}
                      <Row className='justify-content-center'>
                        <Col md={12} className='mb-3'>
                          <Box
                            display={'flex'}
                            flexDir={'column'}
                            height={'400px'}
                            justifyContent={'space-evenly'}>
                            <Heading textAlign={'center'} mb={3}>
                              Event Details
                            </Heading>
                            <Text fontSize={'1.2rem'} lineHeight={'8'} textAlign={'center'}>
                              {event.description}
                            </Text>
                          </Box>
                        </Col>
                        <Col md={12}></Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      {/* Event Info */}
                      <Box display={'flex'} mb={2}>
                        <Image
                          width={'25%'}
                          borderRadius='full'
                          src={event.owner.profilePhoto}
                          alt="host's profile image"
                        />
                        <Box
                          display={'flex'}
                          flexDir={'column'}
                          ml={3}
                          justifyContent={'space-evenly'}
                          mr={2}>
                          <Text fontWeight={500} fontSize={'1.5rem'}>
                            Hosted by {event.owner.name}
                          </Text>
                          {likedBy && user ? (
                            likedBy.some((like) => {
                              return user._id === like.owner.id
                            }) ? (
                              <Button
                                className='px-5'
                                colorScheme='blue'
                                onClick={handleLikes}
                                size={'sm'}>
                                Cancel RSVP
                              </Button>
                            ) : (
                              <Button
                                className='px-5'
                                colorScheme='red'
                                onClick={handleLikes}
                                size={'sm'}>
                                RSVP
                              </Button>
                            )
                          ) : (
                            ''
                          )}
                        </Box>
                        <Box display={'flex'} flexDir={'column'} justifyContent={'flex-end'} mb={4}>
                          <Wrap>
                            {likedBy &&
                              likedBy
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .map((like) => {
                                  return (
                                    <WrapItem key={like.owner._id}>
                                      <Avatar
                                        name={like.owner.name}
                                        src={like.owner.profilePhoto}
                                      />
                                    </WrapItem>
                                  )
                                })}
                          </Wrap>
                        </Box>
                      </Box>
                      <Box border='1px solid grey' borderRadius='xl'>
                        <Table variant='simple'>
                          <Tbody>
                            <Tr>
                              <Th>Type</Th>
                              <Td>
                                {event.eventType.map((type) => {
                                  // maybe have each type srounded in a light colored box of sorts?
                                  return <Badge key={type}>{type}</Badge>
                                })}
                              </Td>
                            </Tr>
                            <Tr>
                              <Th>Date:</Th>
                              <Td>
                                <Badge>{event.eventDate}</Badge>
                              </Td>
                            </Tr>
                            <Tr>
                              <Th>Time:</Th>
                              <Td>
                                <Badge>{event.eventTime}</Badge>
                              </Td>
                            </Tr>
                            <Tr>
                              <Th>Event Location:</Th>
                              <Td>
                                <Text fontSize='sm' fontStyle='bold'>
                                  {updatedEventLocation.locationName}
                                </Text>
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </Box>
                    </Col>
                  </Row>
                </Col>
              ) : (
                <Spinner animation='border'></Spinner>
              )}
              {/* Map */}
              <Col md={12} className='mb-3'>
                {userGeoLocation && (
                  <Map
                    initialViewState={{
                      longitude: updatedEventLocation.longitude,
                      latitude: updatedEventLocation.latitude,
                      zoom: 13,
                    }}
                    style={{ height: 200 }}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                    mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}>
                    <Marker
                      color='green'
                      longitude={updatedEventLocation.longitude}
                      latitude={updatedEventLocation.latitude}></Marker>
                  </Map>
                )}
              </Col>
              {/* Comment Submit */}
              {userIsAuthenticated() && (
                <Col md={12} className='mb-3'>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            name='text'
                            as='textarea'
                            onChange={handleChange}
                            placeholder='Add Comment Here'
                            value={comments.text}
                          />
                        </Form.Group>
                      </Col>
                      <Col style={{ alignSelf: 'flex-end' }}>
                        <Form.Group>
                          <Button name='text' type='submit'>
                            Post Comment
                          </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              )}
              {/* Comments */}
              <Col md={12}>
                <Row>
                  {!event.comments.length ? (
                    <></>
                  ) : (
                    <>
                      {event.comments
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((comment) => {
                          return (
                            // <Col md={12} key={comment._id}>
                            //   <Box border='1px solid grey' className='mb-2'>
                            //     <Row
                            //       className='p-2'
                            //       style={{ backgroundColor: 'white', minWidth: '100%' }}
                            //     >
                            //       <Col>
                            //         <Box display={'inline-block'}>
                            //           <Text text>{comment.owner.username}</Text>
                            //           <Avatar src={comment.owner.profilePhoto} />
                            //         </Box>
                            //       </Col>
                            //       <Row>
                            //         <Col>
                            //           <Text>{comment.text}</Text>
                            //         </Col>
                            //       </Row>
                            //     </Row>
                            //   </Box>
                            // </Col>
                            <Box
                              border={'1px solid white'}
                              bg={'whitesmoke'}
                              mb={2}
                              key={comment._id}>
                              <Box display={'flex'} flexDirection={'column'}>
                                <Box>
                                  <Box display={'flex'} alignItems={'center'} my={2}>
                                    <Avatar src={comment.owner.profilePhoto} />
                                    <Text my={3} pl={'1rem'} textColor={'grey'}>
                                      {comment.owner.username}
                                    </Text>
                                    <Text pl={'0.5rem'}>{comment.text}</Text>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          )
                        })}
                    </>
                  )}
                </Row>
              </Col>
              <Row>
                <Col>
                  <div></div>
                </Col>
              </Row>
            </Row>
          </Container>
        ) : (
          <div>loading</div>
        )}
      </section>
    </>
  )
}

export default SingleEvent
