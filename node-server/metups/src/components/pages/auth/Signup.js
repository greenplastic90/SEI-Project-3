import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Figure from 'react-bootstrap/Figure'

import { Button } from '@chakra-ui/react'

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
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formDataUpdated = formData
    if (!formDataUpdated.profilePhoto) {
      formDataUpdated = {
        ...formDataUpdated,
        profilePhoto:
          'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg',
      }
    }
    try {
      await axios.post('/api/register/', formDataUpdated)

      navigate('/login')
    } catch (err) {
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
          obj[key] = 'Profile description is longer than the maximum allowed length (280).'
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
      data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET)
      const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
      setFormData({ ...formData, profilePhoto: res.data.url })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section>
      <Container className='pt-5'>
        <Form onSubmit={handleSubmit}>
          {/* name */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='name'>Full Name</Form.Label>
            <Form.Control
              reqired
              name='name'
              type='text'
              placeholder='Full Name'
              onChange={handleChange}
            />
            {formErrors.name && <Form.Text className='text-muted'>{formErrors.name}</Form.Text>}
          </Form.Group>

          {/* username */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control
              reqired
              name='username'
              type='text'
              placeholder='Username'
              onChange={handleChange}
            />
            {formErrors.username && (
              <Form.Text className='text-muted'>{formErrors.username}</Form.Text>
            )}
          </Form.Group>

          {/* email  */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              reqired
              name='email'
              type='email'
              placeholder='Email'
              onChange={handleChange}
            />
            {formErrors.email && <Form.Text className='text-muted'>{formErrors.email}</Form.Text>}
          </Form.Group>
          {/* password */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              reqired
              name='password'
              type='password'
              placeholder='Password'
              onChange={handleChange}
            />
            {formErrors.password && (
              <Form.Text className='text-muted'>{formErrors.password}</Form.Text>
            )}
          </Form.Group>
          {/* password conformation */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='confirm password'>Confirm Password</Form.Label>
            <Form.Control
              reqired
              name='passwordConfirmation'
              type='password'
              placeholder='Confirm Password'
              onChange={handleChange}
            />
            {formErrors.passwordConfirmation && (
              <Form.Text className='text-muted'>{formErrors.passwordConfirmation}</Form.Text>
            )}
          </Form.Group>

          <hr />
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='profileDescription'>Profile Description</Form.Label>
            <Form.Text className='text-muted'>- optional -</Form.Text>
            <Form.Control
              onChange={handleChange}
              as='textarea'
              name='profileDescription'
              defaultValue={formData.profileDescription}
            />

            {formErrors.profileDescription && (
              <Form.Text className='text-muted'>{formErrors.profileDescription}</Form.Text>
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
                <Form.Text className='text-muted'>{formErrors.profilePhoto}</Form.Text>
              )}
            </Row>
          </Form.Group>
          <Form.Group className='mt-4 text-center'>
            <Button colorScheme='brand.primary' type='submit'>
              Signup
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </section>
  )
}

export default Signup
