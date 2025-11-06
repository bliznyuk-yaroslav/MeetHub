import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { selectIsAuthenticated } from '../../redux/auth/selectors'
import { clearAuthHeader } from '../../redux/auth/operations'
import { logout } from '../../redux/auth/slice'
import Button from '@mui/material/Button'

export default function Header() {
  const isAuth = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(logout())
    clearAuthHeader()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.brand}>MeetHub</div>
      <nav className={styles.nav}>
        {!isAuth ? (
          <>
            <Button component={NavLink} to="/login" variant="contained" color="primary">Login</Button>
            <Button component={NavLink} to="/register" variant="outlined" color="primary">Register</Button>
          </>
        ) : (
          <>
            <Button component={NavLink} to="/rooms" variant="outlined" color="primary">Rooms</Button>
            <Button onClick={onLogout} variant="outlined" color="error">Logout</Button>
          </>
        )}
      </nav>
    </header>
  )
}
