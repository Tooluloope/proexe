import { User } from './types'
import { usersApi } from '../../utils'
export const fetchUsers = async (): Promise<User[]> => {
  const response = await usersApi.get<User[]>('data')
  return response.data
}
