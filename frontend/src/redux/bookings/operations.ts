import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000'
const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } })

export const fetchBookingsThunk = createAsyncThunk(
  'bookings/fetchByRoom',
  async ({ token, roomId }: { token: string; roomId: string | number }) => {
    const { data } = await api.get(`/rooms/${roomId}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data || []
  }
)

export const createBookingThunk = createAsyncThunk(
  'bookings/create',
  async ({ token, payload }: { token: string; payload: { roomId: number | string; start: string; end: string; description?: string | null } }) => {
    const body = { ...payload, roomId: Number(payload.roomId) }
    const { data } = await api.post('/bookings', body, { headers: { Authorization: `Bearer ${token}` } })
    return data
  }
)

export const updateBookingThunk = createAsyncThunk(
  'bookings/update',
  async ({ token, id, payload }: { token: string; id: number; payload: { start?: string; end?: string; description?: string | null } }) => {
    const { data } = await api.patch(`/bookings/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
    return data
  }
)

export const deleteBookingThunk = createAsyncThunk(
  'bookings/delete',
  async ({ token, id }: { token: string; id: number }) => {
    await api.delete(`/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    return id
  }
)

export const joinBookingThunk = createAsyncThunk(
  'bookings/join',
  async ({ token, id }: { token: string; id: number }) => {
    await api.post(`/bookings/${id}/join`, {}, { headers: { Authorization: `Bearer ${token}` } })
    return id
  }
)

export const leaveBookingThunk = createAsyncThunk(
  'bookings/leave',
  async ({ token, id }: { token: string; id: number }) => {
    await api.delete(`/bookings/${id}/join`, { headers: { Authorization: `Bearer ${token}` } })
    return id
  }
)

