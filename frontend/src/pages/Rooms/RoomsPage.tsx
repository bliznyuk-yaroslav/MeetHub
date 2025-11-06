import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { selectToken } from '../../redux/auth/selectors'
import { selectRooms, selectRoomsError, selectRoomsLoading } from '../../redux/rooms/selectors'
import { fetchRoomsThunk, createRoomThunk, deleteRoomThunk } from '../../redux/rooms/operations'
import styles from './RoomsPage.module.scss'
import RoomList from '../../components/RoomList/RoomList'
import CreateRoomDialog from '../../components/CreateRoomDialog/CreateRoomDialog'
import Button from '@mui/material/Button'

export default function RoomsPage() {
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const rooms = useAppSelector(selectRooms)
  const loading = useAppSelector(selectRoomsLoading)
  const error = useAppSelector(selectRoomsError)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!token) return
    dispatch(fetchRoomsThunk({ token }) as any)
  }, [token, dispatch])

  if (!token) {
    return (
      <div className={styles.container}>
        <p>Please login to view your rooms.</p>
      </div>
    )
  }

  const handleCreate = async () => {
    if (!token) return
    const nm = name.trim()
    if (nm.length < 2) {
      window.alert('Room name must be at least 2 characters')
      return
    }
    const descClean = (description ?? '').trim()
    const payload = { name: nm, description: descClean === '' ? null : descClean }
    try {
      await (dispatch(createRoomThunk({ token, payload }) as any)).unwrap()
      setOpen(false)
      setName('')
      setDescription('')
    } catch (e: any) {
      window.alert(e?.message || 'Failed to create room')
    }
  }

  const handleDelete = async (id: number) => {
    if (!token) return
    const ok = window.confirm('Delete this room? This cannot be undone.')
    if (!ok) return
    await dispatch(deleteRoomThunk({ token, id }) as any)
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.header}>My Rooms</h1>
        <Button variant="contained" onClick={() => setOpen(true)} disabled={!token}>Create Room</Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <RoomList items={rooms} onDelete={handleDelete} />
      )}

      <CreateRoomDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={async (payload) => {
          setName(payload.name)
          setDescription(payload.description)
          await handleCreate()
        }}
      />
    </div>
  )
}
