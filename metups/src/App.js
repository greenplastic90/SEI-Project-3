import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

// Importing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Importing made elements
import PageNavbar from './components/pages/common/PageNavbar'
import Home from './components/pages/Home'
import Signup from './components/pages/auth/Signup'
import Login from './components/pages/auth/Login'

// Importing Bootstrap elements
import Button from 'react-bootstrap/Button'

function App() {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('/api/events/') // * <-- replace with your endpoint
  //     console.log(data)
  //   }
  //   getData()
  // })

  return (
    <div className='site-wrapper'>
      <Router>
        <PageNavbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
