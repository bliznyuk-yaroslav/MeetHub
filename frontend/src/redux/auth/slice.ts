import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loginThunk, registerThunk } from './operations'

export type User = {
  id: string
  email: string
  name?: string | null
} | null

type AsyncStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected'

export type AuthState = {
  token: string | null
  user: User
  loginStatus: AsyncStatus
  registerStatus: AsyncStatus
  error: string | null
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
  loginStatus: 'idle',
  registerStatus: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    logout(state) {
      state.token = null
      state.user = null
      state.loginStatus = 'idle'
      state.registerStatus = 'idle'
      state.error = null
      if (typeof window !== 'undefined') localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loginStatus = 'pending'
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<{ token: string; user?: User }>) => {
        state.loginStatus = 'fulfilled'
        state.token = action.payload.token
        state.user = action.payload.user ?? state.user
        if (typeof window !== 'undefined') localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginThunk.rejected, (state, action: PayloadAction<any>) => {
        state.loginStatus = 'rejected'
        state.error = (action.payload as string) ?? 'Login failed'
      })
      .addCase(registerThunk.pending, (state) => {
        state.registerStatus = 'pending'
        state.error = null
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.registerStatus = 'fulfilled'
      })
      .addCase(registerThunk.rejected, (state, action: PayloadAction<any>) => {
        state.registerStatus = 'rejected'
        state.error = (action.payload as string) ?? 'Register failed'
      })
  },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
