import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Signup = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profilePhoto: '',
    profileDescription: '',
  })

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profilePhoto: '',
    profileDescription: '',
  })

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/register/', formData)
      navigate('/')
    } catch (err) {
      //console.log(err.response)
      console.log('keys ->', Object.keys(err.response.data.errors))
      const obj = {}
      Object.keys(err.response.data.errors).forEach((key) => {
        obj[key] = err.response.data.errors[key].message
      })

      setFormErrors({
        ...formErrors,
        ...obj,
      })
    }
  }

  return (
    <section>
      <Container className='mt-5'>
        <Form onSubmit={handleSubmit}>
          {/* username */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control
              type='username'
              placeholder='Username'
              onChange={handleChange}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          {/* email  */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              onChange={handleChange}
            />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          {/* password */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          {/* password conformation */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='confirm password'>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Confirm Password' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <hr />
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='profileDescription'>
              Profile Description
            </Form.Label>
            <Form.Control
              onChange={handleChange}
              type='profileDescription'
              name='profileDescription'
              defaultValue={formData.profileDescription}
            />
            <Form.Text className='text-muted'>- optional -</Form.Text>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='profilePhoto'>Profile Photo</Form.Label>
            <Form.Control
              onChange={handleChange}
              type='profilePhoto'
              name='profilePhoto'
              defaultValue={formData.profilePhoto}
            />
            <Form.Text className='text-muted'> - optional - </Form.Text>
          </Form.Group>
          <Form.Group className='mt-4 text-center'>
            <Button type='submit'>Log in</Button>
          </Form.Group>
        </Form>
      </Container>
    </section>
  )
}

export default Signup
