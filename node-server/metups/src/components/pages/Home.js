import React from 'react'

import { Button, Heading, Image, Stack, Text } from '@chakra-ui/react'
import heroImage from '../../images/home.png'
import PageWrapper from './common/PageWrapper'
import { useNavigate } from 'react-router-dom'
import EventCards from './common/EventCards'

const Home = ({ events }) => {
  const navigate = useNavigate()

  return (
    <PageWrapper>
      <Stack flexDir={{ base: 'column', md: 'row', lg: 'row' }}>
        <Stack spacing={6} justify={'center'}>
          <Heading fontWeight={'bold'}>
            The platform for people—Connecting interests, creating friendships
          </Heading>
          <Text>
            Find your passion, from outdoor adventures to book clubs, professional networking to
            skill exchanges, on MetUps. Daily events await—dive in and enjoy the experience.
          </Text>
          <Button
            w={'fit-content'}
            colorScheme='brand.primary'
            onClick={() => navigate('/register')}>
            Join MetUps
          </Button>
        </Stack>
        <Stack align={'center'}>
          <Image src={heroImage} alt='Hero' />
        </Stack>
      </Stack>
      <EventCards events={events} />
    </PageWrapper>
  )
}

export default Home
