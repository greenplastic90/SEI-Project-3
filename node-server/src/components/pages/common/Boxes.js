import { Badge, Box, Image } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Boxes = ({ item }) => {
  const navigate = useNavigate()

  return (
    <Box
      onClick={() => navigate(`/events/${item._id}`)}
      maxW={'sm'}
      borderWidth='1px'
      borderRadius={'lg'}
      overflow='hidden'
      bg={'#174C4F'}
      mb={2}
      cursor={'pointer'}
    >
      <Image src={item.image}  h={200} w={400} alt='' />
      <Box p={6} color={'white'}>
        <Box display={'flex'} alignItems={'baseline'}>
          {item.eventType.map((type) => {
            return (
              <Badge key={type} borderRadius={'full'} px={2} mr={1}>
                {type}
              </Badge>
            )
          })}
          {/* <Badge borderRadius={'full'} px={2}>
            {item.eventType}
          </Badge> */}
          <Box
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {item.eventDate}
          </Box>
        </Box>
      </Box>
      <Box display={'flex'} paddingInline={'6'}>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
          pb={4}
          color={'white'}
        >
          {item.eventName}
        </Box>
      </Box>
    </Box>
  )
}

export default Boxes
