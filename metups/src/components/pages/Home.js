import React from 'react'
import Footer from './common/Footer'

const Home = () => {
  return (
    <>
      <div className='wrap-container'>
        <div className="container-left">
          <h4>Welcome to Metups</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut nibh dictum, vulputate est quis, maximus odio. </p>
        </div>
        <div className="container-right">
          <h4>This is an img</h4>
        </div>
      </div>
      <div className="mid-homepage">
        <div className="wrap-containers">
          <div className="container-one"></div>
          <div className="container-two"></div>
          <div className="container-three"></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
