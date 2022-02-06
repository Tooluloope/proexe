import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectUsers } from '../../features/Users/usersSlice'
import { User } from '../../features/Users/types'

export default function EditPage() {
  const { users } = useAppSelector(selectUsers)
  const [state, setState] = useState<User>()
  const params = useParams()
  const navigate = useNavigate()
  const { id } = params

  useEffect(() => {
    const isValidUser = users.find((user) => user.id === parseInt(id ?? ''))

    console.log(isValidUser)
    if (!isValidUser) {
      return navigate('/', { replace: true })
    }
    setState(isValidUser)
  }, [id])

  return <div>{JSON.stringify(state)}</div>
}
