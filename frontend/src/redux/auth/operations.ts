import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AppDispatch } from '../store'

export const apiClient = axios.create({
  baseURL: "https://meethub-kc2v.onrender.com/",
  headers: { 'Content-Type': 'application/json' },
})

export const setAuthHeader = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export const clearAuthHeader = () => {
  delete apiClient.defaults.headers.common['Authorization']
}

let interceptorId: number | undefined
export const setupAxiosInterceptors = (store: { dispatch: AppDispatch }) => {
  if (interceptorId !== undefined) return
  interceptorId = apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        store.dispatch({ type: 'auth/logout' })
        clearAuthHeader()
      }
      return Promise.reject(error)
    }
  )
}
export const ejectAxiosInterceptor = () => {
  if (interceptorId !== undefined) {
    apiClient.interceptors.response.eject(interceptorId)
    interceptorId = undefined
  }
}

export const loginThunk = createAsyncThunk('auth/login', async (payload: { email: string; password: string }) => {
  const { data } = await apiClient.post('/auth/login', payload)
  const token: string | undefined = data?.token || data?.accessToken || data?.jwt
  if (!token) throw new Error('Invalid response: token missing')
  setAuthHeader(token)
  return { token, user: { id: 'me', email: payload.email } }
})

export const registerThunk = createAsyncThunk('auth/register', async (payload: { name: string; email: string; password: string }) => {
  const { data } = await apiClient.post('/auth/register', payload)
  const token: string | undefined = data?.token || data?.accessToken || data?.jwt
  if (!token) throw new Error('Invalid response: token missing')
  setAuthHeader(token)
  return { token, user: { id: 'me', email: payload.email, name: payload.name } }
})
