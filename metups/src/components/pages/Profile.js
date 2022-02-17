import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Button,
  Text,
  Image,
  Stack,
  Heading,
  Divider,
  Table,
  Tbody,
  Tr,
  Td
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../../auth/helpers'
import axios from 'axios'
import ProfilePicture from '../../images/genericProfilePic.png'
import ResetPassword from './auth/ResetPassword'
import Boxes from './common/Boxes'

const Profile = ({ user, setUser }) => {
  const navigate = useNavigate()

  const createEvent = () => {
    navigate('/eventCreate')
  }

  const nav = (id) => {
    navigate(`/events/${id}`)
  }

  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        // console.log('Profile')
        setUser(data)
      }
      getUserProfile()
    } catch (error) {
      console.log(error)
    }
  }, [setUser])
  
  // const resetPass = () => {
  //   navigate('/resetPassword')
  // }

  const deleteEvent = async (id) => {
    try {
      const { data } = await axios.delete(`/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      })
    } catch (err) {
      console.log(err.response.data)
    }

    try {
      const getUserProfile = async () => {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        // console.log('Profile')
        setUser(data)
      }
      getUserProfile()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container
      display={'flex'}
      flexDirection={{ base: 'column', xl: 'row'}}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
      maxW={'full'}
      gap={4}
    >
      {user && (
        <>
          <Container
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={'center'}
            boxShadow={'lg'}
            justifyContent={'center'}
            borderRadius={'8'}
            py={'1.5rem'}
            my={'5'}
            width={{ base: 'full', md: '100%', lg: '100%' }}
            margin={0}
          >
            <Box
              boxSize={['100', '150', '200']}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              pb={'2rem'}
            >
              <Image
                boxSize='120'
                src={user.profilePhoto ? user.profilePhoto : ProfilePicture}
                alt='profile'
                borderRadius='100%'
                rounded={'100%'}
                objectFit={'cover'}
              />
              <Text fontSize={'lg'} textAlign={'center'}>
                {user.name}
              </Text>
            </Box>
            <Container textAlign={'center'} my={'2'} maxW={'inherit'}>
              <Heading>Profile Details</Heading>
              <Divider />
              <Table variant={'unstyled'}>
                <Tbody>
                  <Tr>
                    <Td>Username</Td>
                    <Td>{user.username}</Td>
                  </Tr>
                  {user.profileDescription && 
                    <Tr>
                      <Td>Desc</Td>
                      <Td>{user.profileDescription}</Td>
                    </Tr>
                  }
                  <Tr>
                    <Td>Email</Td>
                    <Td>{user.email}</Td>
                  </Tr>
                  <Tr>
                    <Td>Create Event</Td>
                    <Td><Button onClick={createEvent}>Create Event</Button></Td>
                  </Tr>
                  <Tr>
                    <Td>Password</Td>
                    <Td><ResetPassword/></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Container>
          </Container>
          <Stack>
            <Stack
              alignSelf={'center'}
              direction={{ base: 'column', md: 'row' }}
              spacing={'10'}
              mt={5}
            >
              <Box maxW={250} alignSelf={{ base: 'center', md: 'flex-start' }}>
                <Heading fontSize={'2rem'} textAlign={'center'} pb={2}>
                  Events Created
                </Heading>
                {user.ownedEvents.map(
                  (items, i) => {
                    return (
                      // <Box key={i} id={_id} px={2}>
                      //   <Image maxH={'64px'} width={'fit-content'} src={image} alt='event' />
                      //   <Text fontSize={'lg'}>{eventName}</Text>
                      //   <Text isTruncated>{description}</Text>
                      <>
                      <Boxes item={items} />
                        <Button
                          onClick={() => deleteEvent(items._id)}
                          color={'white'}
                          p={1}
                          bg={'red'}
                          rounded={'md'}
                          size={'24px'}
                        >
                          Delete Event
                        </Button>
                      </>
                      // </Box>
                    )
                  }
                )}
              </Box>
              <Box maxW={250} alignSelf={{ base: 'center', md: 'flex-start' }}>
                <Heading fontSize={'2rem'} textAlign={'center'} pb={2}>
                  Events Attended
                </Heading>
                {user.likedEvents.map(
                  (items, i) => {
                    return (
                      <Boxes item={items} key={i} />
                      // <Box key={i} py={2}>
                      //   <Image width={'fit-content'} objectFit={'fill'} maxH={'64px'} src={image} alt='event' onClick={() => nav(_id)} className='Pointer-Cur' />
                      //   <Text fontSize={'lg'}>{eventName}</Text>
                      //   <Text isTruncated>{description}</Text>
                      // </Box>
                    )
                  }
                )}
              </Box>
            </Stack>
          </Stack>
        </>
      )}
    </Container>
  )
}

export default Profile
