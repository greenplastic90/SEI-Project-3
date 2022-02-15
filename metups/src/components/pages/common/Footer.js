import React from 'react'
import image from '../../../images/github.png'
import { Container } from '@chakra-ui/react'

const Footer = () => {

  return (
    <>
      <Container className='footer' as={'footer'} mt={'2.5rem'}>
        <div>
          <p>Made by:</p>
          <div className="names">
            <p><img src={image} alt="github logo" /> <a href='https://github.com/greenplastic90' rel="noreferrer" target='_blank'>Bashar</a></p>
            <p><img src={image} alt="github logo" /> <a href='https://github.com/florent-haxhiu' rel="noreferrer" target='_blank'>Florent</a></p>
            <p><img src={image} alt="github logo" /> <a href='https://github.com/mmay95' rel="noreferrer" target='_blank'>Mehtaab</a></p>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Footer