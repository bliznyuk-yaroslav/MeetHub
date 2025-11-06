import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createBookingThunk, deleteBookingThunk, fetchBookingsThunk, joinBookingThunk, leaveBookingThunk, updateBookingThunk } from './operations'

export type Booking = {
  id: number
  roomId: number
  userId: number
  start: string
  end: string
  description?: string | null
  joined?: boolean
}

type AsyncStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected'

export type BookingsState = {
  items: Booking[]
  status: AsyncStatus
  error: string | null
}

const initialState: BookingsState = {
  items: [],
  status: 'idle',
  error: null,
}

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsThunk.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchBookingsThunk.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.status = 'fulfilled'
        state.items = action.payload
      })
      .addCase(fetchBookingsThunk.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'rejected'
        state.error = (action.payload as string) ?? 'Failed to load bookings'
      })
      .addCase(createBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
        const i = state.items.findIndex((b) => b.id === action.payload.id)
        if (i >= 0) state.items[i] = action.payload
      })
      .addCase(deleteBookingThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((b) => b.id !== action.payload)
      })
      .addCase(joinBookingThunk.fulfilled, (state, action: PayloadAction<number>) => {
        const i = state.items.findIndex((b) => b.id === action.payload)
        if (i >= 0) state.items[i] = { ...state.items[i], joined: true }
      })
      .addCase(leaveBookingThunk.fulfilled, (state, action: PayloadAction<number>) => {
        const i = state.items.findIndex((b) => b.id === action.payload)
        if (i >= 0) state.items[i] = { ...state.items[i], joined: false }
      })
  },
})

export default bookingsSlice.reducer
