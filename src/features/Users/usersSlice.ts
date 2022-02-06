import { User } from './types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { fetchUsers } from './usersAPI'

export interface UsersState {
  users: User[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
}
export const fetUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  return fetchUsers()
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      console.log('here oo')
      state.users = [...state.users, action.payload]
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
    editUser: (state, action: PayloadAction<User>) => {
      const filterUsers = state.users.filter(
        (user) => user.id !== action.payload.id
      )

      state.users = [...filterUsers, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetUsersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.users = action.payload
      })
  },
})

export const { addUser, editUser, removeUser } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users

export default usersSlice.reducer
