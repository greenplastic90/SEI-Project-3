import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { getTokenFromLocalStorage } from '../../auth/helpers'

const Profile = () => {

  // State variables
  const [ people, setPeople ] = useState([])

  useEffect(() => {
    try {
      const getPeople = async () => {
        const { data } = await axios.get('/api/events/profile', {}, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage}`
          }
        })
        console.log('Profile ->', data)
        setPeople(data)
      }
      getPeople()
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    <>
      {/* Need an rounded Image, next to it. Display username, email and allow them to create an event */}
      <section className='topProfile'>
        <img className='rounded-circle z-depth-1' src='https://picsum.photos/200/200' alt='profile pic' />
        <div className="profile-container">
          <p>Username: {people.username}</p>
          <p>Email: {people}</p>
          <Button>Create Event</Button>
        </div>
      </section>
      <hr />
      <section className='midProfile'>
        
      </section>
    </>
  )
}

export default Profile
