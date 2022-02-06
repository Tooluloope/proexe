import { FormControl, Box, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

interface IFormField {
  name: string
  value?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export function FormField({ name, value, handleChange }: IFormField) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event)
  }
  return (
    <FormControl
      id={name}
      display={{ base: 'block', md: 'flex' }}
      justifyContent="space-between"
      alignItems={'center'}
    >
      <Box flex={1}>
        <FormLabel
          textTransform={'capitalize'}
          textAlign={{ base: 'left', md: 'center' }}
        >
          {name}
        </FormLabel>
      </Box>
      <Input
        name={name}
        required={name === 'name' || name === 'email'}
        value={value}
        onChange={onChange}
        maxW={'700px'}
        type={name === 'email' ? 'email' : 'text'}
      />
    </FormControl>
  )
}
