import type { RootState } from '../store'

export const selectRooms = (state: RootState) => state.rooms.items
export const selectRoomsLoading = (state: RootState) => state.rooms.status === 'pending'
export const selectRoomsError = (state: RootState) => state.rooms.error
