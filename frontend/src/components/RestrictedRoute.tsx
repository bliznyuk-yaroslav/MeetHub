import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/store'
import { selectIsAuthenticated } from '../redux/auth/selectors'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  redirectTo?: string
}

export default function RestrictedRoute({ children, redirectTo = '/rooms' }: Props) {
  const isAuth = useAppSelector(selectIsAuthenticated)
  return isAuth ? <Navigate to={redirectTo} replace /> : <>{children}</>
}