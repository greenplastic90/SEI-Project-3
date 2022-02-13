import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

// Importing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importing made elements
import PageNavbar from './components/pages/common/PageNavbar'
import Home from './components/pages/Home'
import Signup from './components/pages/auth/Signup'
import Login from './components/pages/auth/Login'
import EventCreate from './components/pages/EventCreate'
import SingleEvent from './components/pages/Event'
import EventIndex from './components/pages/EventIndex'
import Profile from './components/pages/Profile'

function App() {
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const { data } = await axios.get('/api/events')
        setAllEvents(data)
      } catch (err) {
        console.log(err.response)
      }
    }
    getAllEvents()
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
    <div className='site-wrapper'>
      <Router>
        <PageNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/events/:id' element={<SingleEvent />} />
          <Route
            path='/eventCreate'
            element={<EventCreate options={options} />}
          />
          <Route path='/events' element={<EventIndex />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
