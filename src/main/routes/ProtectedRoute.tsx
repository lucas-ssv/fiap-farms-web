import { Navigate, Outlet, useLocation } from 'react-router'

import { useAuth } from '@/presentation/contexts'

export function ProtectedRoute() {
  const { user } = useAuth()
  const location = useLocation()

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}
