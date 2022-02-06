import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react'
import { useAppDispatch } from '../app/hooks'
import { removeUser } from '../features/Users/usersSlice'

interface IModal {
  isOpen: boolean
  onClose: () => void
  id: number
}
export default function DeleteModal({ isOpen, onClose, id }: IModal) {
  const dispatch = useAppDispatch()

  const confirmDelete = () => {
    dispatch(removeUser(id))
    onClose()
  }
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this user</Text>
          </ModalBody>
          <ModalFooter>
            <Button mr="10px" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} color={'white'} bg={'#d75452'}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
