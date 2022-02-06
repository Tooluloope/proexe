import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectUsers } from '../../features/Users/usersSlice'
import { User } from '../../features/Users/types'
import { UserForm } from '../../components/UserForm'

export default function EditPage() {
  const { users, status } = useAppSelector(selectUsers)
  const [state, setState] = useState<User>()
  const params = useParams()
  const navigate = useNavigate()
  const { id } = params

  useEffect(() => {
    const isValidUser = users.find((user) => user.id?.toString() === id)

    if (!isValidUser && status === 'loading') {
      return navigate('/', { replace: true })
    }
    setState(isValidUser)
  }, [id])

  return (
    <div>
      <UserForm user={state} isEditMode />
    </div>
  )
}
