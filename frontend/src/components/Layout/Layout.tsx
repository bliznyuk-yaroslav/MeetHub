import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import s from './Layout.module.scss'

export default function Layout() {
  return (
    <div className={s.layout}>
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
