import React from 'react'
import ReactDOM from 'react-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import './styles/main.scss'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'

ReactDOM.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
)
