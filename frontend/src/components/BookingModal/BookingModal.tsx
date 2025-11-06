import Modal from '../Modal/Modal'
import styles from './BookingModal.module.scss'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

type Props = {
  open: boolean
  editId: number | null
  start: string
  end: string
  description: string
  error: string | null
  onClose: () => void
  onChangeStart: (v: string) => void
  onChangeEnd: (v: string) => void
  onChangeDescription: (v: string) => void
  onSave: () => void
}

export default function BookingModal({ open, editId, start, end, description, error, onClose, onChangeStart, onChangeEnd, onChangeDescription, onSave }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<>{editId ? 'Edit booking' : 'Create booking'}</>}
      footer={
        <>
          <Button variant="text" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onSave} disabled={!start || !end}>Save</Button>
        </>
      }
    >
      <div className={styles.content}>
        <div className={styles.grid}>
          <TextField
            label="Start"
            type="datetime-local"
            value={start}
            onChange={(e) => onChangeStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 900 }}
            fullWidth
          />
          <TextField
            label="End"
            type="datetime-local"
            value={end}
            onChange={(e) => onChangeEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 900 }}
            fullWidth
          />
        </div>

        <TextField
          label="Description"
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder="Optional description"
          fullWidth
        />

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Modal>
  )
}
