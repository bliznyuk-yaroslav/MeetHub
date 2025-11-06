import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'https://meethub-kc2v.onrender.com/'
const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } })

export const fetchRoomsThunk = createAsyncThunk('rooms/fetchMine', async ({ token }: { token: string }) => {
  const { data } = await api.get('/rooms/mine', { headers: { Authorization: `Bearer ${token}` } })
  return data || []
})

export const createRoomThunk = createAsyncThunk(
  'rooms/create',
  async ({ token, payload }: { token: string; payload: { name: string; description?: string | null } }) => {
    const { data } = await api.post('/rooms', payload, { headers: { Authorization: `Bearer ${token}` } })
    return data
  }
)

export const updateRoomThunk = createAsyncThunk(
  'rooms/update',
  async ({ token, id, payload }: { token: string; id: number; payload: { name?: string; description?: string | null } }) => {
    const { data } = await api.patch(`/rooms/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
    return data
  }
)

export const deleteRoomThunk = createAsyncThunk('rooms/delete', async ({ token, id }: { token: string; id: number }) => {
  await api.delete(`/rooms/${id}`, { headers: { Authorization: `Bearer ${token}` } })
  return id
})

export const addMemberThunk = createAsyncThunk(
  'rooms/addMember',
  async ({ token, roomId, payload }: { token: string; roomId: number | string; payload: { email: string; role: 'Admin' | 'User' } }) => {
    await api.post(`/rooms/${roomId}/members`, payload, { headers: { Authorization: `Bearer ${token}` } })
    return true
  }
)
