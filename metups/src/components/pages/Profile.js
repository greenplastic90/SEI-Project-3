import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

const Profile = () => {

  // State variables
  const [ people, setPeople ] = useState([])

  const getToken = () => {
    return window.localStorage.getItem('metups-login-token')
  }

  useEffect(() => {
    try {
      const getPeople = async () => {
        const { data } = await axios.get(`/api/profile`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
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

  console.log(`People object -> ${Object.keys(people)}`)
  console.log(`People values -> ${Object.values(people)}`)
  
  return (
    <>
    {/* {people && <> {Object.keys( people.map(({ username, email }, i) => {
          return (
            <h1 key={i}>{username}</h1>
          )
        }))}</>}
        
      {/* Need an rounded Image, next to it. Display username, email and allow them to create an event */}
      {Object.keys(people.map(item => {
        return (
          <h1>{item.username}</h1>
        )
      }))}
    </>
  )
}

export default Profile
