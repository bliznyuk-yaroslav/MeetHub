import { useState } from 'react'
import Modal from '../Modal/Modal'

type Props = {
  open: boolean
  onClose: () => void
  onAdd: (payload: { email: string; role: 'Admin' | 'User' }) => Promise<void> | void
}

export default function AddMemberDialog({ open, onClose, onAdd }: Props) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'Admin' | 'User'>('User')

  const handleSubmit = async () => {
    await onAdd({ email, role })
    setEmail('')
    setRole('User')
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={<>Add member</>}
      footer={
        <>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={handleSubmit} disabled={!email.trim()}>Add</button>
        </>
      }
    >
      <div className="grid" style={{gap: 12}}>
        <label className="label">
          <span>Email</span>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="label">
          <span>Role</span>
          <select className="input" value={role} onChange={(e) => setRole(e.target.value as 'Admin' | 'User')}>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </label>
      </div>
    </Modal>
  )
}
