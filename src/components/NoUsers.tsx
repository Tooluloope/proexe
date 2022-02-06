import { WarningTwoIcon } from '@chakra-ui/icons'
import { Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export const NoUser = () => {
  return (
    <Flex justifyContent={'center'} py="60px">
      <Stack align={'center'}>
        <WarningTwoIcon boxSize={'16'} color="red.500" />
        <Text fontWeight={'500'} fontSize="20px">
          No User Found
        </Text>
      </Stack>
    </Flex>
  )
}
