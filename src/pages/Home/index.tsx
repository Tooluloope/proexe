import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
  Link,
  useDisclosure,
} from '@chakra-ui/react'
import { useTable, useSortBy, Column } from 'react-table'
import React, { useState } from 'react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { User } from '../../features/Users/types'
import { MotionBox } from '../../components/MotionBox'
import DeleteModal from '../../components/Modal'

export default function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState<number | null>(null)

  const data: User[] = React.useMemo(
    () => [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        address: {
          street: 'Victor Plains',
          suite: 'Suite 879',
          city: 'Wisokyburgh',
          zipcode: '90566-7771',
          geo: {
            lat: '-43.9509',
            lng: '-34.4618',
          },
        },
        phone: '010-692-6593 x09125',
        website: 'anastasia.net',
        company: {
          name: 'Deckow-Crist',
          catchPhrase: 'Proactive didactic contingency',
          bs: 'synergize scalable supply-chains',
        },
      },
    ],
    []
  )

  const handleDelete = (id: number) => {
    setState(id)
    onOpen()
  }

  const columns: Column<User>[] = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'City',
        accessor: (originalRow) => originalRow.address.city,
      },
      {
        width: 300,
        Header: 'Edit',
        sortable: false,
        Cell: ({
          row,
        }: {
          row: {
            original: User
          }
        }) => {
          const { original } = row
          return (
            <Link href={`/add/${original.id}`}>
              <Button bgColor={'#eeac57'} color="white" px="30px">
                Edit
              </Button>
            </Link>
          )
        },
      },
      {
        width: 300,
        Header: 'Delete',
        sortable: false,
        Cell: ({
          row,
        }: {
          row: {
            original: User
          }
        }) => {
          const { original } = row
          return (
            <Button
              onClick={() => handleDelete(original.id)}
              bgColor={'#d75452'}
              color="white"
              px="30px"
            >
              Delete
            </Button>
          )
        },
      },
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)
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
        <Table {...getTableProps()}>
          <Thead bg="#f5f5f5" h="100px">
            {headerGroups.map((headerGroup, idx) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                {headerGroup.headers.map((column, idx) => (
                  <Th
                    textAlign={'center'}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={idx}
                  >
                    {column.render('Header')}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, idx) => {
              prepareRow(row)
              return (
                <Tr h="100px" {...row.getRowProps()} key={idx}>
                  {row.cells.map((cell, idx) => (
                    <Td {...cell.getCellProps()} key={idx}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </MotionBox>
      {state !== null && (
        <DeleteModal isOpen={isOpen} onClose={onClose} id={state} />
      )}
    </Box>
  )
}
