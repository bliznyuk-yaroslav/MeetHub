import './App.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from '../Layout/Layout'
import RestrictedRoute from '../RestrictedRoute'
import Spinner from '../Spinner/Spinner'
import PrivateRoute from '../PrivateRoute'

const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'))
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'))
const RoomsPage = lazy(() => import('../../pages/Rooms/RoomsPage'))
const RoomDetailsPage = lazy(() => import('../RoomsDetails/RoomDetails'))
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'))


function App() {

  return (
    <>
      <Suspense fallback={<Spinner />}> 
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<RestrictedRoute redirectTo="/rooms"><LoginPage /></RestrictedRoute>} />
            <Route path="/register" element={<RestrictedRoute redirectTo="/rooms"><RegisterPage /></RestrictedRoute>} />
            <Route path="/rooms" element={<PrivateRoute><RoomsPage /></PrivateRoute>} />
            <Route path="/rooms/:id" element={<PrivateRoute><RoomDetailsPage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>

    </>
  )
}

export default App