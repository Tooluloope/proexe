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

interface Modal {
  isOpen: boolean
  onClose: () => void
  id: number
}
export default function DeleteModal({ isOpen, onClose, id }: Modal) {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              : The wrapper that provides context for its children.
              ModalOverlay: The dimmed overlay behind the modal dialog.
              ModalContent: The container for the modal dialogs content.
              ModalHeader: The header that labels the modal dialog. ModalFooter:
              The footer that houses the modal actions.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
