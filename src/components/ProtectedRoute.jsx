import React, { useContext } from 'react'
import { AuthContext } from '../contexts/LoginContext'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from './admin/Loading'

function ProtectedRoute() {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "SuperAdmin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute