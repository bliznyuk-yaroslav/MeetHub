import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'
import { selectIsAuthenticated } from '../redux/auth/selectors'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  redirectTo?: string
}

export default function PrivateRoute({ children, redirectTo = '/login' }: Props) {
  const isAuth = useAppSelector(selectIsAuthenticated)
  return isAuth ? children : <Navigate to={redirectTo} replace />
}