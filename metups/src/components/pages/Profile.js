import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'

const Profile = ({ user }) => {
  // State variables

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <>
          <h2>{user.username}</h2>
        </>
      )}
    </>
  )
}

export default Profile
