import React, { useEffect } from 'react'
import './App.css'
import {
  Routes,
  Route,
  Navigate,
  Link as ReachLink,
  useLocation,
} from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './app/hooks'
import HomePage from './pages/Home/index'
import AddPage from './pages/Add/index'
import { fetUsersAsync, selectUsers } from './features/Users/usersSlice'
import { Box, Button, Flex, Link, Text, useToast } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import EditPage from './pages/Edit'
import { Loading } from './components/Loading'

function App() {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectUsers)
  const toast = useToast()
  const location = useLocation()

  useEffect(() => {
    dispatch(fetUsersAsync())
  }, [])

  if (status === 'loading') {
    return <Loading />
  }
  if (status === 'failed') {
    toast({
      title: 'Failed to load Users',
      status: 'error',
      duration: 1000,
      isClosable: true,
      position: 'bottom-right',
    })
  }

  return (
    <Box w="100vw" px="20px" overflow={'hidden'}>
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
              {location.pathname === '/' ? 'User List' : 'Form'}
            </Text>
            {location.pathname === '/' && (
              <Link
                as={ReachLink}
                style={{
                  textDecoration: 'none',
                }}
                to="/add"
              >
                <Button bgColor={'#1477d5'} color="white" px="30px">
                  Add new
                </Button>
              </Link>
            )}
          </Flex>
          <AnimatePresence>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="add" element={<AddPage />} />
              <Route path="edit/:id" element={<EditPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </Box>
      </Flex>
    </Box>
  )
}

export default App
