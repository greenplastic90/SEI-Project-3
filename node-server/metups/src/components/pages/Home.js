import React from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import { userIsAuthenticated } from '../../auth/helpers'
import Boxes from './common/Boxes'
import { Heading, Text } from '@chakra-ui/react'
import heroImage from '../../images/home.png'

const Home = ({ events }) => {
  return (
    <section className='mainHome'>
      <Container className='pt-5'>
        <Row className='justify-content-around'>
          <Heading className='text-center mb-5' as='h1' size='3xl' textAlign={'start'}>
            The platform for people—Connecting interests, creating friendships
          </Heading>
          <Col md={6} sm={8}>
            <div>
              <Text className='mt-5' fontSize='2xl' lineHeight='200%'>
                Find your passion, from outdoor adventures to book clubs, professional networking to
                skill exchanges, on MetUps. Daily events await—dive in and enjoy the experience.
              </Text>
            </div>
          </Col>
          <Col md={6} sm={4}>
            <Image src={heroImage} alt='gathering image' />
          </Col>
          <Col md={12} className='py-5'>
            <Row>
              {events.map((item, i) => {
                if (userIsAuthenticated()) {
                  return (
                    i < 6 && (
                      <Col key={item._id} md={4}>
                        <Boxes className='homepage-boxes' item={item} />
                      </Col>
                    )
                  )
                } else {
                  return (
                    i < 6 && (
                      <Col key={item._id} md={4}>
                        <Boxes className='homepage-boxes' item={item} />
                      </Col>
                    )
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
