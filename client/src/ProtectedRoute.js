import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth()
    console.log(loading, isAuthenticated)

    if (loading) return <p>Loading...</p>
    if (!loading && !isAuthenticated) return <Navigate to='/login' />

  return (
    <Outlet />
  )
}
