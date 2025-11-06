import dayjs from 'dayjs'
import styles from './BookingList.module.scss'
import Button from '@mui/material/Button'

type Booking = { id: number; start: string; end: string; description?: string | null; joined?: boolean }

type Props = {
  bookings: Booking[]
  onEdit: (b: Booking) => void
  onDelete: (id: number) => void
  canManage?: boolean
  onJoin: (id: number) => void
  onLeave: (id: number) => void
}

export default function BookingList({ bookings, onEdit, onDelete, canManage = true, onJoin, onLeave }: Props) {
  if (bookings.length === 0) return <p>No bookings yet.</p>
  return (
    <div className={styles.list}>
      {bookings.map((b) => (
        <div key={b.id} className={styles.card}>
          <div className={styles.meta}>
            <div>
              <strong>{dayjs(b.start).format('YYYY-MM-DD HH:mm')}</strong> → <strong>{dayjs(b.end).format('YYYY-MM-DD HH:mm')}</strong>
            </div>
            {b.description && <div style={{ opacity: 0.8 }}>{b.description}</div>}
          </div>
          <div className={styles.actions}>
            {/* Participation action always available for room members */}
            {b.joined ? (
              <Button variant="outlined" color="inherit" onClick={() => onLeave(b.id)}>Leave</Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => onJoin(b.id)}>Join</Button>
            )}
            {canManage && (
              <>
                <Button variant="text" onClick={() => onEdit(b)}>Edit</Button>
                <Button variant="outlined" color="error" onClick={() => onDelete(b.id)}>Delete</Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
