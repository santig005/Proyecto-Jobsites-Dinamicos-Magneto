// AdminProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export default function AdminProtectedRoute() {
  const { loading, isAuthenticated , user} = useAuth();
    console.log(loading, isAuthenticated, user.role)
  if (loading) return <p>Loading...</p>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" />;

    return <Outlet />;
//   // Verifica si el usuario tiene el rol de "admin"
//   if (user && user.role === 'admin') {
//     return <Outlet />;
//   } else {
//     // Redirige a la página de inicio
//     return <Navigate to="/login" />;
//   }
}
