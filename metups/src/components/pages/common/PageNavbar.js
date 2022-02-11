import React from 'react'
import { Link } from 'react-router-dom'

const PageNavbar = () => (
  <>
    <header>
      <nav>
        <li><Link to = '/'>MetUps</Link></li>
        <li><Link to = '/login'>Login</Link></li>
        <li><Link to = '/register'>Signup</Link></li>
      </nav>
    </header>
  </>
)

export default PageNavbar