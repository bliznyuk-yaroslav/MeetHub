import type { RootState } from '../store'

export const selectBookings = (state: RootState) => state.bookings.items
export const selectBookingsLoading = (state: RootState) => state.bookings.status === 'pending'
export const selectBookingsError = (state: RootState) => state.bookings.error
