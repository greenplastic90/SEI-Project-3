import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { getTokenFromLocalStorage } from './auth/helpers.js'

// Importing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Mapbox styles

// Importing made elements
import PageNavbar from './components/pages/common/navbar/PageNavbar.js'
import Home from './components/pages/Home'
import Signup from './components/pages/auth/Signup'
import Login from './components/pages/auth/Login'
import EventCreate from './components/pages/EventCreate'
import SingleEvent from './components/pages/Event'

import { Box } from '@chakra-ui/react'
import Events from './components/pages/events/Events.js'
import Profile from './components/pages/profile/Profile.js'

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

  function handleLogout() {
    setUser(null)
    window.localStorage.removeItem('metups-login-token')
  }

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
      <PageNavbar user={user} handleLogout={handleLogout} />
      <Box pt={40} pb={4} px={[4, 8, 32, 64]}>
        <Routes>
          <Route path='/' element={<Home events={allEvents} />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route
            path='/events/:id'
            element={
              <SingleEvent user={user} userGeoLocation={userGeoLocation} allEvents={allEvents} />
            }
          />
          <Route
            path='/eventCreate'
            element={<EventCreate options={options} userGeoLocation={userGeoLocation} />}
          />
          <Route
            path='/events'
            element={
              <Events options={options} events={allEvents} userGeoLocation={userGeoLocation} />
            }
          />
          <Route
            path='/profile'
            element={<Profile user={user} setUser={setUser} handleLogout={handleLogout} />}
          />

          {/* <Route path='/resetPassword' element={<ResetPassword />} /> */}
        </Routes>
      </Box>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
