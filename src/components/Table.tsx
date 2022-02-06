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
import DeleteModal from './Modal'
import { User } from '../features/Users/types'
import { useAppSelector } from '../app/hooks'
import { selectUsers } from '../features/Users/usersSlice'
import { Link as ReachLink } from 'react-router-dom'

export default function UsersTable() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [state, setState] = useState<number | null>(null)
  const { users } = useAppSelector(selectUsers)

  const data: User[] = React.useMemo(() => users, [users])

  const handleDelete = (id: number) => {
    setState(id)
    onOpen()
  }

  const columns: Column<User>[] = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({
          row,
        }: {
          row: {
            original: User
          }
        }) => {
          const { original } = row
          const str = String(original.id).substring(0, 5)
          return str
        },
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
        accessor: (originalRow) => originalRow?.address?.city,
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
            <Link
              as={ReachLink}
              style={{
                textDecoration: 'none',
              }}
              to={`/edit/${original.id}`}
            >
              <Button
                textDecoration={'none'}
                bgColor={'#eeac57'}
                color="white"
                px="30px"
              >
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
              onClick={() => handleDelete(original.id as number)}
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

  return (
    <Box>
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

      {state !== null && (
        <DeleteModal isOpen={isOpen} onClose={onClose} id={state} />
      )}
    </Box>
  )
}
