import { useState } from 'react'
import Modal from '../Modal/Modal'

type Props = {
  open: boolean
  onClose: () => void
  onCreate: (payload: { name: string; description: string }) => Promise<void> | void
}

export default function CreateRoomDialog({ open, onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async () => {
    await onCreate({ name, description })
    setName('')
    setDescription('')
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<>Create new room</>}
      footer={
        <>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSubmit} disabled={!name.trim()}>Create</button>
        </>
      }
    >
      <div className="grid" style={{gap: 12}}>
        <label className="label">
          <span>Name</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="label">
          <span>Description</span>
          <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
      </div>
    </Modal>
  )
}
