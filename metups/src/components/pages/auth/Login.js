import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

// BOOTSTRAP COMPONENTS
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Text } from '@chakra-ui/react'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const newValue = { ...formData, [e.target.name]: e.target.value }
    setFormData(newValue)
    setFormError('')
  }

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('metups-login-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login/', formData)
      setTokenToLocalStorage(data.token)
      navigate('/')
    } catch (err) {
      console.log(err.response)

      setFormError(err.response.data.message)
    }
  }

  return (
    <section className='form-page'>
      <Container className='pt-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <Row className='justify-content-center'>
            <Col md={6}>
              <Row>
                <h2 className='text-center mb-5'>Login</h2>
                <Col md={6}>
                  <Form.Group className='mb-2'>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      type='username'
                      name='username'
                      placeholder='Username'
                      defaultValue={formData.username}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className='mb-2'>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      type='password'
                      name='password'
                      placeholder='Password'
                      defaultValue={formData.password}
                    />
                  </Form.Group>
                </Col>
                {formError && (
                  <Form.Text className='text-center'>{formError}</Form.Text>
                )}
              </Row>
            </Col>
          </Row>

          <Form.Group className='mt-4 text-center'>
            <Button type='submit'>Log in</Button>
          </Form.Group>
        </Form>
        <Text textAlign={'center'} mt='5'>If you aren't already signed up, <Link to='/register'>Sign up here</Link></Text>
      </Container>
    </section>
  )
}

export default Login
