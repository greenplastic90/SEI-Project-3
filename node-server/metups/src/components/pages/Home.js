import React from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import { userIsAuthenticated } from '../../auth/helpers'
import Boxes from './common/Boxes'
import { Box, Heading, Text } from '@chakra-ui/react'

const Home = ({ options, events, user }) => {
  return (
    <section className='mainHome'>
      <Container className='pt-5'>
        <Row className='justify-content-around'>
          <Heading className='text-center mb-5' as='h1' size='3xl'>
            Welcome to MetUps
          </Heading>
          <Col md={6} sm={8}>
            <div>
              <Text className='mt-5' fontSize='2xl' lineHeight='200%'>
                MetUps is the perfect place for everything you're looking to do
                this year! For 0 days, people have been turning to MetUp to
                organise, host and arrange events. Through MetUp, people have
                explored their intrerests, grown their community and expanded
                their skill sets. Join the fun now and sign up to create your
                first event!
              </Text>
            </div>
          </Col>
          <Col md={6} sm={4}>
            <Image
              src='https://res.cloudinary.com/dhpy1llxc/image/upload/v1645114080/SEI_61_PROJECT_3/Seeds%20Folder/AdobeStock_315614892_ccexpress_ufxmhx.png'
              alt='gathering image'
            />
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
