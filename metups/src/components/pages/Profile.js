import React, { useEffect } from 'react'
import { Box, Container, Button, Text, Image, Stack, Heading, Divider } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../auth/helpers'
import axios from 'axios'

const Profile = ({ user }) => {
  const navigate = useNavigate()

  const createEvent = () => {
    navigate('/eventCreate')
  }

  const resetPass = () => {
    navigate('/resetPassword')
  }

  const deleteEvent = async (id) => {
    try {
      const { data } = await axios.delete(`/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        }
      })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <Container display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'} height={'100%'}>
      {user && (
        <>
          <Container display={'flex'} flexDirection={{ base:'column', md: 'row'}} alignItems={'center'} boxShadow={'lg'} justifyContent={'center'} borderRadius={'8'} py={'1.5rem'} my={'5'} width={{ base: 'full', md: '100%', lg: '100%' }}>
            <Box boxSize={['100', '150', '200']} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} pb={'2rem'}>
              <Image boxSize='120' src={user.profilePhoto} alt="profile" borderRadius='100%' rounded={'100%'} objectFit={'cover'}  />
              <Text fontSize={'lg'} textAlign={'center'}>{user.username}</Text>
            </Box>
            <Box textAlign={'center'}>
              <Heading>Profile Details</Heading>
              <Divider />
              <Text>Username | {user.username}</Text>
              <Text>Email | {user.email}</Text>
              <Text>Create Event | <Button onClick={createEvent}>Create Event</Button></Text>
              <Text>Password | <Button onClick={resetPass}>Reset Password</Button></Text>
            </Box>
          </Container>
          <Stack>
            <Stack direction={{ base: 'column', md: 'row'}} spacing={'10'} mt={5}>
              <Box maxW={250} alignSelf={{ base: 'center', md: 'flex-start'}}>
                <Heading fontSize={'2rem'} textAlign={'center'} pb={2}>Events Created</Heading>
                {user.ownedEvents.map(({ image, eventName, description, _id }, i) => {
                  return (
                  <Box key={i} id={_id} py={2}>
                    <Image maxHeight={100} src={image} alt='event' />
                    <Text>{eventName}</Text>
                    <Text isTruncated>{description}</Text>
                    <Button onClick={() => deleteEvent(_id)} color={'white'} p={1} bg={'red'} rounded={'sm'} size={'24px'}>Delete Event</Button>
                  </Box>
                  )
                })}
              </Box>
              <Box maxW={250} alignSelf={'center'}>
                <Heading fontSize={'2rem'} textAlign={'center'} pb={2}>Events Attended</Heading>
                {user.likedEvents.map(({ image, eventName, description }, i) => {
                  return (
                  <Box key={i} py={2}>
                    <Image src={image} alt='event' />
                    <Text fontSize={'lg'}>{eventName}</Text>
                    <Text isTruncated>{description}</Text>
                  </Box>
                  )
                })}
              </Box>
            </Stack>
          </Stack>
        </>
      )}
    </Container>
  )
}

export default Profile
