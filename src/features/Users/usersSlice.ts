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
      state.users = [...state.users, action.payload]
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
    editUser: (state, action: PayloadAction<User>) => {
      const updateUsers = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload
        }
        return user
      })
      state.users = updateUsers
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetUsersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetUsersAsync.rejected, (state) => {
        state.status = 'failed'
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
