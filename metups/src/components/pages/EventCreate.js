import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../auth/helpers'

import { mapToken } from '../../config/enviroments.js'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'

import { useNavigate } from 'react-router-dom'
import { cloudinaryURL, uploadPreset } from '../../config/enviroments.js'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EventCreate = ({ options, userGeoLocation }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    eventName: '',
    eventType: [],
    description: '',
    locationName: '',
    latitude: null,
    longitude: null,
    map: '',
    eventDate: '',
    eventTime: '',
    image: '',
    isDemo: false, // always false if we want the event to not change its location.
  })

  const [formErrors, setFormErrors] = useState('')
  const [searchQueryData, setSearchQueryData] = useState([])
  const [addressPicked, setAddressPicked] = useState({})

  // Test React Async
  const forwardQuery = async (inputValue) => {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${mapToken}`
      )
      // console.log(data)
      return data.features.map((feature) => {
        return {
          ...feature,
          value: feature.place_name,
          label: feature.place_name,
        }
      })
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    const forwardQuery = async () => {
      try {
        const { data } = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${formData.map}.json?access_token=${mapToken}`
        )
        // console.log(data)

        setSearchQueryData(data.features)
      } catch (err) {
        console.log(err.response)
      }
    }
    forwardQuery()
  }, [formData.map])

  const handleChange = (e) => {
    console.log('e ->', e)
    if (e.target) {
      const newObj = { ...formData, [e.target.name]: e.target.value }
      setFormData(newObj)
      setFormErrors({ ...formErrors, [e.target.name]: '' })
    } else {
      console.log(e)
      const arrayOfValues = e.map((obj) => {
        return obj.label
      })
      console.log(arrayOfValues)
      const newValue = { ...formData, eventType: arrayOfValues }
      setFormData(newValue)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formDataUpdated = formData
    if (!formDataUpdated.image) {
      formDataUpdated = {
        ...formData,
        image:
          'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
      }
    }

    try {
      const { data } = await axios.post('/api/events/', formDataUpdated, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
      navigate(`/events/${data._id}`)
    } catch (err) {
      console.log(err.response)
    }
  }

  const handelImageUpload = async (e) => {
    try {
      const data = new FormData()
      data.append('file', e.target.files[0])
      data.append('upload_preset', uploadPreset)
      const res = await axios.post(cloudinaryURL, data)
      // console.log(res.data.url)
      setFormData({ ...formData, image: res.data.url })
    } catch (err) {
      console.log(err)
    }
  }
  const handelLocationChange = (feature) => {
    setFormData({
      ...formData,
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1],
      locationName: feature.text,
    })
  }

  return (
    <section>
      <Container className='pt-5'>
        <Form onSubmit={handleSubmit}>
          {/* eventName */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='eventName'>Event Name</Form.Label>
            <Form.Control
              required
              name='eventName'
              type='eventName'
              placeholder='Event Name'
              onChange={handleChange}
            />
            <Form.Text className='text-muted'>
              Add the name of your event here
            </Form.Text>
          </Form.Group>

          {/* type  */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='eventType'>Type of Event</Form.Label>
            <Select
              closeMenuOnSelect={false}
              defaultValue={formData.eventType}
              isMulti
              options={options}
              name='eventType'
              onChange={handleChange}
            />
            <Form.Text className='text-muted'>
              Add the type of event you're hosting
            </Form.Text>
          </Form.Group>

          {/* description */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='description'>Description</Form.Label>
            <Form.Control
              required
              as='textarea'
              name='description'
              onChange={handleChange}
            />
            <Form.Text className='text-muted'>
              Add a description for your event
            </Form.Text>
          </Form.Group>

          {/* map */}
          {formData.longitude && (
            <>
              <Map
                viewState={{
                  longitude: formData.longitude,
                  latitude: formData.latitude,
                  zoom: 13,
                }}
                mapboxAccessToken={mapToken}
                style={{ height: 100 }}
                mapStyle='mapbox://styles/mapbox/streets-v11'
              >
                <Marker
                  longitude={formData.longitude}
                  latitude={formData.latitude}
                ></Marker>
              </Map>
            </>
          )}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='map'>Address</Form.Label>
            {/* <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={forwardQuery}
            /> */}
            <AsyncSelect
              loadOptions={forwardQuery}
              name='map'
              onChange={(e) => handelLocationChange(e)}
            />
            {/* <Form.Control
              required
              type='text'
              placeholder='Address'
              name='map'
              onChange={handleChange}
            /> */}
          </Form.Group>

          {/* eventDate */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='eventDate'>Date</Form.Label>
            <Form.Control
              required
              type='date'
              name='eventDate'
              onChange={handleChange}
              placeholder='eventDate'
            />
            <Form.Text className='text-muted'>
              Add the date on which your event will take place
            </Form.Text>
          </Form.Group>

          {/* eventTime */}
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='eventTime'>Time</Form.Label>
            <Form.Control
              required
              type='Time'
              name='eventTime'
              placeholder='eventTime'
              onChange={handleChange}
            />
            <Form.Text className='text-muted'>
              Add the time at which your event will take place
            </Form.Text>
          </Form.Group>

          {/* Upload Image */}

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='image'>Add Image</Form.Label>
            <Form.Control
              onChange={handelImageUpload}
              type='file'
              name='image'
              defaultValue={formData.image}
            />
            <Form.Text className='text-muted'>
              Add an image banner for your event!{' '}
            </Form.Text>
          </Form.Group>
          {formData.image && (
            <>
              <Image src={formData.image} alt='event image' />
            </>
          )}

          <Form.Group className='mt-4 text-center'>
            <Button type='submit' onClick={handleSubmit}>
              Create Event
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </section>
  )
}

export default EventCreate
