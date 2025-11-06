import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAppDispatch } from '../../redux/store'
import { loginThunk } from '../../redux/auth/operations'
import { useNavigate, Link } from 'react-router-dom'
import styles from './LoginPage.module.scss'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await (dispatch(loginThunk({ email, password })) as any).unwrap()
      navigate('/rooms')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
          <span>Email</span>
          <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className={styles.label}>
          <span>Password</span>
          <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit">Sign in</button>
      </form>
      <p style={{marginTop: 8}}>
        No account? <Link to="/register">Create one</Link>
      </p>
    </div>
  )
}
