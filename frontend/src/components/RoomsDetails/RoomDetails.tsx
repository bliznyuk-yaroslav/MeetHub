import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { selectToken } from '../../redux/auth/selectors'
import { selectBookings, selectBookingsError, selectBookingsLoading } from '../../redux/bookings/selectors'
import { fetchBookingsThunk, createBookingThunk, updateBookingThunk, deleteBookingThunk, joinBookingThunk, leaveBookingThunk } from '../../redux/bookings/operations'
import { addMemberThunk, updateRoomThunk } from '../../redux/rooms/operations'
import { selectRooms } from '../../redux/rooms/selectors'
import AddMemberDialog from '../AddMemberDialog/AddMemberDialog'
import Button from '@mui/material/Button'
import BookingList from '../BookingList/BookingList'
import BookingModal from '../BookingModal/BookingModal'
import EditRoomModal from '../EditRoomModal/EditRoomModal'
import dayjs from 'dayjs'

export default function RoomDetailsPage() {
  const { id: roomId } = useParams()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const bookings = useAppSelector(selectBookings)
  const loading = useAppSelector(selectBookingsLoading)
  const error = useAppSelector(selectBookingsError)
  const rooms = useAppSelector(selectRooms)

  const [openBooking, setOpenBooking] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [description, setDescription] = useState('')
  const [bookingError, setBookingError] = useState<string | null>(null)

  const [openMember, setOpenMember] = useState(false)

  const [roomName, setRoomName] = useState('')
  const [roomDesc, setRoomDesc] = useState('')
  const [editRoomOpen, setEditRoomOpen] = useState(false)

  const toInput = (iso: string) => (iso ? dayjs(iso).format('YYYY-MM-DDTHH:mm') : '')
  const toISO = (local: string) => new Date(local).toISOString()

  const currentRoom = rooms.find((r) => r.id === Number(roomId))
  const canManage = currentRoom?.role === 'Admin'

  useEffect(() => {
    if (!token || !roomId) return
    dispatch(fetchBookingsThunk({ token, roomId }) as any)
  }, [token, roomId, dispatch])

  const handleOpenCreate = () => {
    setEditId(null)
    setStart('')
    setEnd('')
    setDescription('')
    setOpenBooking(true)
  }

  const handleSaveBooking = async () => {
    if (!token || !roomId) return
    setBookingError(null)

    if (!start || !end) return setBookingError('Please provide start and end time')
    const s = new Date(start)
    const e = new Date(end)
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return setBookingError('Invalid date/time')
    if (s >= e) return setBookingError('End time must be after start time')

    const payload = { start: toISO(start), end: toISO(end), description: description || null }
    try {
      if (editId) await dispatch(updateBookingThunk({ token, id: editId, payload }) as any)
      else await dispatch(createBookingThunk({ token, payload: { roomId, ...payload } }) as any)
      setOpenBooking(false)
    } catch (err: any) {
      setBookingError(err.message || 'Failed to save booking')
    }
  }

  const handleEdit = (b: { id: number; start: string; end: string; description?: string | null }) => {
    setEditId(b.id)
    setStart(toInput(b.start))
    setEnd(toInput(b.end))
    setDescription(b.description || '')
    setOpenBooking(true)
  }

  const handleDelete = async (id: number) => {
    if (!token) return
    if (!window.confirm('Cancel this booking?')) return
    await dispatch(deleteBookingThunk({ token, id }) as any)
  }

  const handleJoin = async (id: number) => {
    if (!token) return
    await dispatch(joinBookingThunk({ token, id }) as any)
  }

  const handleLeave = async (id: number) => {
    if (!token) return
    await dispatch(leaveBookingThunk({ token, id }) as any)
  }

  const handleSaveRoom = async () => {
    if (!token || !roomId) return
    await dispatch(updateRoomThunk({ token, id: Number(roomId), payload: { name: roomName || undefined, description: roomDesc || null } }) as any)
    setEditRoomOpen(false)
  }

  const handleAddMember = async (payload: { email: string; role: 'Admin' | 'User' }) => {
    if (!token || !roomId) return
    await dispatch(addMemberThunk({ token, roomId, payload }) as any)
    setOpenMember(false)
  }

  return (
    <div className="container" style={{ paddingBlock: 12 }}>
      <div className="row-between" style={{ marginBottom: 12 }}>
        <h2>Room details</h2>
        {canManage && (
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="outlined" onClick={() => setOpenMember(true)}>Add member</Button>
            <Button variant="outlined" onClick={() => setEditRoomOpen(true)}>Edit room</Button>
            <Button variant="contained" onClick={handleOpenCreate}>New booking</Button>
          </div>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{color:'#ef4444'}}>{error}</p>}

      {!loading && !error && (
        <BookingList
          bookings={bookings as any}
          onEdit={handleEdit as any}
          onDelete={handleDelete}
          canManage={Boolean(canManage)}
          onJoin={handleJoin}
          onLeave={handleLeave}
        />
      )}

      <BookingModal open={openBooking} editId={editId} start={start} end={end} description={description} error={bookingError} onClose={() => setOpenBooking(false)} onChangeStart={setStart} onChangeEnd={setEnd} onChangeDescription={setDescription} onSave={handleSaveBooking} />

      <EditRoomModal open={editRoomOpen} roomName={roomName} roomDesc={roomDesc} onClose={() => setEditRoomOpen(false)} onChangeName={setRoomName} onChangeDesc={setRoomDesc} onSave={handleSaveRoom} />

      <AddMemberDialog open={openMember} onClose={() => setOpenMember(false)} onAdd={handleAddMember} />
    </div>
  )
}
