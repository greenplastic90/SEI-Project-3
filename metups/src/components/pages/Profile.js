import React, { useEffect } from 'react'
import { Box, Container, Button, Text, Image, Stack, Table, Tbody, Tr, Td, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Profile = ({ user }) => {
  const navigate = useNavigate()

  const createEvent = () => {
    navigate('/eventCreate')
  }

  return (
    <Container display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'100%'} height={'100%'}>
      {user && (
        <>
          <Container display='flex' flexDirection={{ base:'column', md: 'row'}} alignItems={'center'} boxShadow={'lg'} justifyContent={'center'} borderRadius={'8'} py={'1.5rem'} my={'5'} width={{ base: 'full', md: 'container.md', lg: 'container.lg', 'xl': 'container.xl' }}>
            <Box boxSize={['100', '150', '200']} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} pb={'2rem'}>
              <Image boxSize={120} src={user.profilePhoto} alt="profile" borderRadius='100' rounded={'full'} objectFit={'cover'}/>
              <Text fontSize={'lg'} textAlign={'center'}>{user.username}</Text>
            </Box>
            <Box>
              <Table variant={'striped'} colorScheme={'twitter'} borderRadius={'8px'}>
                <Tbody>
                  <Tr>
                    <Td>{user.username}</Td>
                    <Td></Td>
                  </Tr>
                  <Tr>
                    <Td>{user.email}</Td>
                    <Td></Td>
                  </Tr>
                  <Tr>
                    <Td>Password</Td>
                    <Td><Button>Update Password</Button></Td>
                  </Tr>
                  <Tr>
                    <Td>Add Event</Td>
                    <Td><Button onClick={createEvent}>Add Event</Button></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Container>
          {/* <Divider /> */}
          <Container>
            <Stack direction={{ base: 'column', md: 'row'}} spacing={'10'} mt={5}>
              <Box maxW={250} alignSelf={'center'}>
                <Heading fontSize={'2rem'} textAlign={'center'} pb={2}>Events Created</Heading>
                {user.ownedEvents.map(({ image, eventName, description }, i) => {
                  return (
                  <Box key={i} py={2}>
                    <Image maxHeight={100} src={image} alt='event' />
                    <Text>{eventName}</Text>
                    <Text isTruncated>{description}</Text>
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
                    <Text>{eventName}</Text>
                    <Text isTruncated>{description}</Text>
                  </Box>
                  )
                })}
              </Box>
            </Stack>
          </Container>
        </>
      )}
    </Container>
  )
}

export default Profile
