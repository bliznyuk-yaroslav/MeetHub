import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createRoomThunk, deleteRoomThunk, fetchRoomsThunk, updateRoomThunk } from './operations'

export type Room = {
  id: number
  name: string
  description?: string | null
  role?: 'Admin' | 'User'
}

type AsyncStatus = 'idle' | 'pending' | 'fulfilled' | 'rejected'

export type RoomsState = {
  items: Room[]
  status: AsyncStatus
  error: string | null
}

const initialState: RoomsState = {
  items: [],
  status: 'idle',
  error: null,
}

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsThunk.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(fetchRoomsThunk.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.status = 'fulfilled'
        state.items = action.payload
      })
      .addCase(fetchRoomsThunk.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'rejected'
        state.error = (action.payload as string) ?? 'Failed to load rooms'
      })
      .addCase(createRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
        state.items.unshift(action.payload)
      })
      .addCase(updateRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
        const idx = state.items.findIndex((r) => r.id === action.payload.id)
        if (idx >= 0) state.items[idx] = action.payload
      })
      .addCase(deleteRoomThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((r) => r.id !== action.payload)
      })
  },
})

export default roomsSlice.reducer
