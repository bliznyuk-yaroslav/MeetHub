import Modal from '../Modal/Modal'
import styles from './EditRoomModal.module.scss'
import Button from '@mui/material/Button'

type Props = {
  open: boolean
  roomName: string
  roomDesc: string
  onClose: () => void
  onChangeName: (v: string) => void
  onChangeDesc: (v: string) => void
  onSave: () => void
}

export default function EditRoomModal({ open, roomName, roomDesc, onClose, onChangeName, onChangeDesc, onSave }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<>Edit room</>}
      footer={
        <>
          <Button variant="text" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onSave}>Save</Button>
        </>
      }
    >
      <div className={styles.content}>
        <label className="label">
          <span>Name</span>
          <input className="input" value={roomName} onChange={(e) => onChangeName(e.target.value)} />
        </label>
        <label className="label">
          <span>Description</span>
          <input className="input" value={roomDesc} onChange={(e) => onChangeDesc(e.target.value)} />
        </label>
      </div>
    </Modal>
  )
}
