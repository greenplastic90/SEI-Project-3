import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

function App() {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/events/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (
    <>
      <Button>Submit</Button>
    </>
  )
}

export default App
