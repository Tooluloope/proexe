import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './app/hooks'
import HomePage from './pages/Home/index'
import AddPage from './pages/Add/index'
import {
  fetUsersAsync,
  selectUsers,
  addUser,
} from './features/Users/usersSlice'
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

function App() {
  const users = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetUsersAsync())
  }, [])

  return (
    <Box w="full" px="20px">
      <Flex
        maxW={'6xl'}
        minH="100vh"
        w="full"
        mx="auto"
        flexDir={'column'}
        justifyContent="center"
      >
        <Text mb="50px" fontSize={'40px'} fontWeight="bold">
          Dashboard
        </Text>
        <Box
          w={'full'}
          bg="white"
          boxShadow={'2xl'}
          rounded={'lg'}
          overflowX={'hidden'}
          h="auto"
        >
          <Flex
            justifyContent={'space-between'}
            alignItems="center"
            p="30px"
            borderBottom={'1px solid'}
            borderBottomColor="gray.200"
          >
            <Text fontSize={'25px'} fontWeight="semi-bold">
              User List
            </Text>
            <Link href="/add/3">
              <Button bgColor={'#1477d5'} color="white" px="30px">
                Add new
              </Button>
            </Link>
          </Flex>

          <AnimatePresence>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="add/:id" element={<AddPage />} />
            </Routes>
          </AnimatePresence>
        </Box>
      </Flex>
    </Box>
  )
}

export default App
