import React from 'react'
import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

import { userIsAuthenticated } from '../../auth/helpers'


const Home = ({ options, events, user }) => {
  return (
    <section>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
        <Row className='justify-content-around'>
          <Col md={6}>
            <div>
              <h4>Welcome {user && user.name} to Metups</h4>
              <p> Metups is the perfect place for everything you're looking to do this year! For 0 days, people have been turning to Metup to organise, host and arrange events. Through Metup, people have explored their intrerests, grown their community and expanded their skill sets. Join the fun now and sign up to create your first event! </p>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <Image src="https://res.cloudinary.com/dhpy1llxc/image/upload/v1645114080/SEI_61_PROJECT_3/Seeds%20Folder/AdobeStock_315614892_ccexpress_ufxmhx.png" alt="gathering stock image" />
            </div>
          </Col>
          <Col md={12} className='py-5'>
            <Row>
              
            

              {events.map((item, i) => {
                if (userIsAuthenticated()) {
                  return (
                    i < 6 &&
                    <Col key={item._id} md={4}>
                      <div className='homepage-events text-center'>
                        <Link to={`/events/${item._id}`}> <Image className='homeImg' src={item.image} alt='event images' /> {item.eventName} </Link>
                      </div>
                    </Col>
                  )
                } else {
                  return (
                    i < 6 &&
                    <Col key={item._id} md={4}>
                      <div className='homepage-events text-center'>
                        <Link to='/login'> <Image className='homeImg' src={item.image} alt='event images' /> {item.eventName} </Link>
                      </div>
                    </Col>
                  )
                }
              })}
            </Row>
          </Col>
        </Row>
        </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Home
