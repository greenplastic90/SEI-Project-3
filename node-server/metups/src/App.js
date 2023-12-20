import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { getTokenFromLocalStorage } from './auth/helpers.js'

// Importing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Mapbox styles

// Importing made elements
import PageNavbar from './components/pages/common/PageNavbar'
import Home from './components/pages/Home'
import Signup from './components/pages/auth/Signup'
import Login from './components/pages/auth/Login'
import EventCreate from './components/pages/EventCreate'
import SingleEvent from './components/pages/Event'
import EventIndex from './components/pages/EventIndex'
import Profile from './components/pages/Profile'
import Footer from './components/pages/common/Footer'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
  const [allEvents, setAllEvents] = useState([])
  const [user, setUser] = useState(null)
  const [userGeoLocation, setUserGeoLocation] = useState(null)

  const getRandomInRange = (from, to) => {
    return (Math.random() * (to - from) + from).toFixed(2) * 1
  }
  // get users location
  useEffect(() => {
    try {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setUserGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const { data } = await axios.get('/api/events/')

        const eventsWithUpdatedLocations = data.map((event) => {
          if (userGeoLocation && event.isDemo) {
            return {
              ...event,
              longitude: getRandomInRange(-0.12, 0.12) + userGeoLocation.longitude,
              latitude: getRandomInRange(-0.08, 0.08) + userGeoLocation.latitude,
            }
          }

          return event
        })

        setAllEvents(eventsWithUpdatedLocations)
      } catch (err) {
        console.log(err.response)
      }
    }
    getAllEvents()
  }, [userGeoLocation])

  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        setUser(data)
      }
      getUserProfile()
    } catch (error) {
      console.log(error)
    }
  }, [])

  // --- Event Types ----
  const options = [
    { value: 'music', label: 'Music' },
    { value: 'sports', label: 'Sports' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'class', label: 'Class' },
    { value: 'tech', label: 'Tech' },
    { value: 'craft', label: 'Craft' },
    { value: 'art', label: 'Art' },
    { value: 'party', label: 'Party' },
    { value: 'culture', label: 'Culture' },
    { value: 'food', label: 'Food' },
    { value: 'history', label: 'History' },
    { value: 'philosophy', label: 'Philosophy' },
  ]
  // --------------------

  return (
    <Router>
      <PageNavbar />
      <div className='site-wrapper'>
        <Row className='justify-content-center'>
          <Col md={8}>
            <Routes>
              <Route path='/' element={<Home options={options} events={allEvents} user={user} />} />
              <Route path='/register' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route
                path='/events/:id'
                element={
                  <SingleEvent
                    user={user}
                    userGeoLocation={userGeoLocation}
                    allEvents={allEvents}
                  />
                }
              />
              <Route
                path='/eventCreate'
                element={<EventCreate options={options} userGeoLocation={userGeoLocation} />}
              />
              <Route
                path='/events'
                element={
                  <EventIndex
                    options={options}
                    events={allEvents}
                    userGeoLocation={userGeoLocation}
                  />
                }
              />
              <Route path='/profile' element={<Profile user={user} setUser={setUser} />} />

              {/* <Route path='/resetPassword' element={<ResetPassword />} /> */}
            </Routes>
          </Col>
        </Row>
      </div>
      <Footer />
    </Router>
  )
}

export default App
