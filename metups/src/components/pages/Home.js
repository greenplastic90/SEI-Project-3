import React from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const Home = ({ options, events }) => {
  return (
    <section>
      <Container>
        <Row className='justify-content-around'>
          <Col md={6}>
            <div>
              <h4>Welcome to Metups</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                ut nibh dictum, vulputate est quis, maximus odio.{' '}
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div>
              <h4>This is an img</h4>
            </div>
          </Col>
          <Col md={12} className='py-5'>
            <Row>
              {events.map((item) => {
                return (
                  <Col key={item._id} md={4}>
                    <img
                      className='homeImg'
                      src={item.image}
                      alt='random images of things'
                    />
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Home
