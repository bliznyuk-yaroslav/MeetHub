import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import styles from './Layout.module.scss'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
