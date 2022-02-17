import { Badge, Box, Image } from '@chakra-ui/react'
import React from 'react'

const Boxes = ({ item }) => {
  return (
    <Box maxW={'sm'} borderWidth='1px' borderRadius={'lg'} overflow='hidden'>
      <Image src={item.image} alt="" />
      <Box p={6}>
        <Box display={'flex'} alignItems={'baseline'}>
          <Badge borderRadius={'full'} px={2}>
            {item.eventType}
          </Badge>
          <Box 
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'>
              {item.eventDate}
          </Box>
        </Box>
      </Box>
      <Box display={'flex'} paddingInline={'6'} >
        <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
            pb={4}
          >
            {item.eventName}
          </Box>
      </Box>
      {}
    </Box>
  )
}

export default Boxes