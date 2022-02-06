import { Box } from '@chakra-ui/react'
import React from 'react'
import { MotionBox } from '../../components/MotionBox'
import UsersTable from '../../components/Table'

export default function HomePage() {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  }
  return (
    <Box p="10px">
      <MotionBox
        w={'full'}
        overflowX="scroll"
        border={'1px solid'}
        borderColor="gray.200"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        rounded={'lg'}
        transition={{
          type: 'tween',
          ease: 'anticipate',
        }}
      >
        <UsersTable />
      </MotionBox>
    </Box>
  )
}
