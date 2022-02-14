import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../auth/helpers'

const Profile = () => {

  // State variables
  const [ people, setPeople ] = useState([])
  const user = useParams()
  useEffect(() => {
    try {
      const getPeople = async () => {
        const { data } = await axios.get(`/api/events/${user}`, {}, {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage}`
          }
        })
        // Can't get the authentication to work for some reason.
        // Not taking the token, maybe I just wrote something wrong but I can't see a fix for it yet.
        console.log('Profile ->', data)
        setPeople(data)
      }
      getPeople()
    } catch (error) {
      console.log(error)
    }
  }, [user])


  return (
    <>
      {/* Need an rounded Image, next to it. Display username, email and allow them to create an event */}
        {people.map(({ username, email, profilePhoto, ownedEvents }) => 
        { 
          return (
          <>
            <section className='topProfile'>
            <img className='rounded-circle z-depth-1' src='https://picsum.photos/200/200' alt='profile pic' />
            <div className="profile-container">
              <p>Username: {username}</p>
              <p>Email: {email}</p>
              <Button>Create Event</Button>
            </div>
            </section>
            <hr />
            <section className='midProfile'>

            </section>
          </>
        )
        })}
    </>
  )
}

export default Profile
