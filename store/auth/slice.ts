import { type User } from '@/interfaces'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  isAuth: boolean
  user: User | null
}

const initialState: AuthState = (() => {
  return {
    isAuth: false,
    user: null
  }
})()

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuth = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuth = false
      state.user = null
    }
  }
})
