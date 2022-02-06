import {
  Stack,
  Box,
  useColorModeValue,
  Button,
  useToast,
  Flex,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { User } from '../features/Users/types'
import { addUser, editUser, selectUsers } from '../features/Users/usersSlice'
import { FormField } from './FormField'
import { v4 as uuidv4 } from 'uuid'

export const UserForm = ({
  user,
  isEditMode,
}: {
  user?: User
  isEditMode: boolean
}) => {
  const [state, setState] = useState(user)
  const { users } = useAppSelector(selectUsers)
  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setState(user)
  }, [user])
  const onCancel = () => {
    return navigate('/', { replace: true })
  }
  const validateUniqueUser = () => {
    const allOtherUsers = users.filter((user) => user.id !== state?.id)
    const isNotUnique = allOtherUsers.find(
      (user) => user.email === state?.email || user.username === state?.username
    )
    if (isNotUnique) return false
    return true
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const isUnique = validateUniqueUser()
    if (!isUnique) {
      return toast({
        title: 'Username or Email exist',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'bottom-right',
      })
    }
    if (isEditMode) {
      dispatch(editUser(state as User))
    }
    if (!isEditMode) {
      const id = uuidv4()
      dispatch(addUser({ ...state, id } as User))
    }
    toast({
      title: `User ${isEditMode ? 'edited' : 'added'} successfully`,
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'bottom-right',
    })
    return navigate('/', { replace: true })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const val = event.target.value
    if (
      name === 'street' ||
      name === 'suite' ||
      name === 'city' ||
      name === 'zipcode'
    ) {
      setState((prev) => ({
        ...prev,
        address: { ...state?.address, [name]: val },
      }))
    }

    if (name === 'catchPhrase' || name === 'bs') {
      setState((prev) => ({
        ...prev,
        company: { ...state?.company, [name]: val },
      }))
    }
    if (name === 'companyName') {
      setState((prev) => ({
        ...prev,
        company: { ...state?.company, name: val },
      }))
    }
    setState((prev) => ({
      ...prev,
      [name]: val,
    }))
  }
  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <form id="userForm" onSubmit={onSubmit}>
        <Stack spacing={10}>
          <FormField
            name="name"
            value={state?.name}
            handleChange={handleChange}
          />
          <FormField
            name="email"
            value={state?.email}
            handleChange={handleChange}
          />
          <FormField
            name="username"
            value={state?.username}
            handleChange={handleChange}
          />
          <FormField
            name="phone"
            value={state?.phone}
            handleChange={handleChange}
          />
          <FormField
            name="website"
            value={state?.website}
            handleChange={handleChange}
          />
          <FormField
            name="street"
            value={state?.address?.street}
            handleChange={handleChange}
          />
          <FormField
            name="suite"
            value={state?.address?.suite}
            handleChange={handleChange}
          />
          <FormField
            name="city"
            value={state?.address?.city}
            handleChange={handleChange}
          />
          <FormField
            name="zipcode"
            value={state?.address?.zipcode}
            handleChange={handleChange}
          />
          <FormField
            name="catchPhrase"
            value={state?.company?.catchPhrase}
            handleChange={handleChange}
          />
          <FormField
            name="companyName"
            value={state?.company?.name}
            handleChange={handleChange}
          />
          <FormField
            name="bs"
            value={state?.company?.bs}
            handleChange={handleChange}
          />
        </Stack>
      </form>

      <Flex justifyContent={'end'} my="30px">
        <Button
          variant={'outline'}
          colorScheme="red"
          mr="10px"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button form="userForm" type="submit" color={'white'} bg={'green'}>
          Submit
        </Button>
      </Flex>
    </Box>
  )
}
