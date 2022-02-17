import React from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

// import { Box, Container } from '@chakra-ui/react'

import { userIsAuthenticated } from '../../auth/helpers'
import { Box, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'


const Home = ({ options, events, user }) => {
  return (
    <section className='mainHome'>
      <Container className='pt-5'>
        <Row className='justify-content-around'>
          <Col md={6}>
            <div>
              {user && userIsAuthenticated ? 
                <Heading>Welcome to Metups | {user.username}</Heading>
                :
                <Heading>Welcome to Metups</Heading>
              }
              <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices pharetra pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce ligula sapien, aliquet in arcu ut, dapibus pellentesque nisi. Praesent aliquam elit vitae mauris tempor, nec accumsan turpis congue. Maecenas sed porta lorem. Proin luctus, ante in consequat mattis, est ante mattis enim, vitae rutrum mi diam sit amet erat. Aliquam volutpat sed augue vel consectetur. Morbi scelerisque erat at vulputate gravida. Proin lobortis ex dui, vel finibus libero cursus tempus. Phasellus odio felis, laoreet eu magna id, rhoncus suscipit nulla. Nam eget libero aliquam libero eleifend venenatis eget a nisi. Sed elementum tortor quis felis euismod congue. Proin metus sem, tempus eu orci in, molestie hendrerit arcu. Donec lacinia fermentum tellus, non sagittis velit lacinia et. Vivamus massa enim, sagittis id fermentum et, rhoncus vel risus. Morbi in ultricies mi. Duis dolor libero, commodo ac rutrum sed, dapibus sed orci. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ornare purus. Phasellus nisl risus, placerat quis sapien vel, placerat gravida enim. Sed odio sem, facilisis id varius et, luctus id nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              </Text>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <Image src="https://media.istockphoto.com/vectors/multicultural-group-of-people-is-standing-together-team-of-colleagues-vector-id1223631367?s=612x612" alt="gathering stock image" />
            </div>
          </Col>
          <Col md={12} className='py-5'>
            <Row>
              {events.map((item, i) => {
                if (userIsAuthenticated()) {
                  return (
                    i < 6 &&
                    <Col key={item._id} md={4}>
                      <div>
                        <img
                          className='homeImg'
                          src={item.image}
                          alt='event images'
                        />
                        <Link to={`/events/${item._id}`}> {item.eventName} </Link>
                      </div>
                    </Col>
                  )
                } else {
                  return (
                    i < 6 &&
                    <Col key={item._id} md={4}>
                      <div>
                        <img
                          className='homeImg'
                          src={item.image}
                          alt='event images'
                        />
                        <Link to='/login'> {item.eventName} </Link>
                      </div>
                    </Col>
                  )
                }
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Home
