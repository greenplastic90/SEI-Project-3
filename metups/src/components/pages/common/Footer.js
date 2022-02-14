import React from 'react'
import image from '../../../images/github.png'

const Footer = () => {

  return (
    <>
      <footer>
        <p>Made by:</p>
        <div className="names">
          <p><img src={image} alt="github logo" /> : <a href='https://github.com/greenplastic90' rel="noreferrer" target='_blank'>Bashar</a></p>
          <p><img src={image} alt="github logo" /> : <a href='https://github.com/florent-haxhiu' rel="noreferrer" target='_blank'>Florent</a></p>
          <p><img src={image} alt="github logo" /> : <a href='https://github.com/mmay95' rel="noreferrer" target='_blank'>Mehtaab</a></p>
        </div>
      </footer>
    </>
  )
}

export default Footer