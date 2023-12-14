import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  id: string
  name: string
  lastName: string
  email: string
}

export interface AuthState {
  isAuth: boolean
  user: UserState | null
}

const initialState: AuthState = {
  isAuth: false,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.isAuth = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuth = false
      state.user = null
    }
  }
})
