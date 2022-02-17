import React from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

// import { Box, Container } from '@chakra-ui/react'

import { userIsAuthenticated } from '../../auth/helpers'


const Home = ({ options, events, user }) => {
  return (
    <section className='mainHome'>
      <Container className='pt-5'>
        <Row className='justify-content-around'>
          <Col md={6}>
            <div>
              <h4>Welcome {user && user.username} to Metups</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                ut nibh dictum, vulputate est quis, maximus odio.{' '}
              </p>
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
