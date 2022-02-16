import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure'

// evnviroment.js imports for uploading images
import { cloudinaryURL, uploadPreset } from '../../../config/enviroments.js'

const Signup = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    name: '',
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
    console.log('name ->', e.target.name)
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/register/', formData)
      console.log(data)
      navigate('/login')
    } catch (err) {
      //console.log(err.response)
      // console.log('keys ->', Object.keys(err.response.data.errors))
      const obj = {}
      Object.keys(err.response.data.errors).forEach((key) => {
        if (
          err.response.data.errors[key].message.includes(
            'is shorter than the minimum allowed length (8).'
          )
        ) {
          obj[key] = 'Password is shorter than the minimum allowed length (8).'
        } else if (
          err.response.data.errors[key].message.includes(
            'is longer than the maximum allowed length (280).'
          )
        ) {
          obj[key] =
            'Profile description is longer than the maximum allowed length (280).'
        } else {
          obj[key] = err.response.data.errors[key].message
        }
      })

      setFormErrors({
        ...formErrors,
        ...obj,
      })
    }
  }

  const handelImageUpload = async (e) => {
    try {
      const data = new FormData()
      data.append('file', e.target.files[0])
      data.append('upload_preset', uploadPreset)
      const res = await axios.post(cloudinaryURL, data)
      console.log(res.data.url)
      setFormData({ ...formData, profilePhoto: res.data.url })
    } catch (err) {
      console.log(err)
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
              name='username'
              type='text'
              placeholder='Username'
              onChange={handleChange}
            />
            {formErrors.username && (
              <Form.Text className='text-muted'>
                {formErrors.username}
              </Form.Text>
            )}
          </Form.Group>

          {/* name */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='name'>name</Form.Label>
            <Form.Control
              reqired
              name='name'
              type='text'
              placeholder='Name'
              onChange={handleChange}
            />
            {formErrors.name && (
              <Form.Text className='text-muted'>{formErrors.name}</Form.Text>
            )}
          </Form.Group>

          {/* email  */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder='Email'
              onChange={handleChange}
            />
            {formErrors.email && (
              <Form.Text className='text-muted'>{formErrors.email}</Form.Text>
            )}
          </Form.Group>
          {/* password */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Password'
              onChange={handleChange}
            />
            {formErrors.password && (
              <Form.Text className='text-muted'>
                {formErrors.password}
              </Form.Text>
            )}
          </Form.Group>
          {/* password conformation */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='confirm password'>Confirm Password</Form.Label>
            <Form.Control
              name='passwordConfirmation'
              type='password'
              placeholder='Confirm Password'
              onChange={handleChange}
            />
            {formErrors.passwordConfirmation && (
              <Form.Text className='text-muted'>
                {formErrors.passwordConfirmation}
              </Form.Text>
            )}
          </Form.Group>

          <hr />
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='profileDescription'>
              Profile Description
            </Form.Label>
            <Form.Text className='text-muted'>- optional -</Form.Text>
            <Form.Control
              onChange={handleChange}
              as='textarea'
              name='profileDescription'
              defaultValue={formData.profileDescription}
            />

            {formErrors.profileDescription && (
              <Form.Text className='text-muted'>
                {formErrors.profileDescription}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='profilePhoto'>Profile Photo</Form.Label>
            <Form.Text className='text-muted'> - optional - </Form.Text>
            <Form.Control
              onChange={handelImageUpload}
              type='file'
              name='profilePhoto'
              defaultValue={formData.profilePhoto}
            />

            {/* this Col is here to size the image a bit smaller for now */}
            <Row>
              <Col md={4}>
                {formData.profilePhoto && (
                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      alt='profile photo'
                      src={formData.profilePhoto}
                    />
                  </Figure>
                )}
              </Col>
              {formErrors.profilePhoto && (
                <Form.Text className='text-muted'>
                  {formErrors.profilePhoto}
                </Form.Text>
              )}
            </Row>
          </Form.Group>
          <Form.Group className='mt-4 text-center'>
            <Button type='submit'>Signup</Button>
          </Form.Group>
        </Form>
      </Container>
    </section>
  )
}

export default Signup
