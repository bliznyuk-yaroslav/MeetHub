import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerThunk } from '../../redux/auth/operations'
import { useAppDispatch } from '../../redux/store'
import styles from './RegisterPage.module.scss'

export default function Register() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await (dispatch(registerThunk({ name, email, password })) as any).unwrap()
      // Simple flow: after successful register, go to /rooms
      navigate('/rooms')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
          <span>Name</span>
          <input className={styles.input} type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className={styles.label}>
          <span>Email</span>
          <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className={styles.label}>
          <span>Password</span>
          <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit">Create account</button>
      </form>
      <p style={{marginTop: 8}}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
