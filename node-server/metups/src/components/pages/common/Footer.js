import React from 'react'
import image from '../../../images/github.png'
import { Container, Box, Text, Image, Divider } from '@chakra-ui/react'

const Footer = () => {

  return (
    <>
      <Container className='footer' as={'footer'} bg={'#ffe4a0'} padding={'2.5rem'} minW={'100%'} display={'flex'} justifyContent={'center'}>
        <Box w={'100%'}>
          <Text textAlign={'center'}>
            Made by:
          </Text>
          <Box lineHeight={'2rem'} gap={4} display={'flex'} justifyContent={'center'} w={'100%'}>
            <Box>
              <a href='https://github.com/greenplastic90' target={'_blank'} rel="noreferrer">Bashar</a>            
            </Box>
            <Box>
              <a href='https://github.com/florent-haxhiu' target={'_blank'} rel="noreferrer">Florent</a>
            </Box>
            <Box>
              <a href='https://github.com/mmay95' target={'_blank'} rel="noreferrer">Mehtaab</a>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Footer