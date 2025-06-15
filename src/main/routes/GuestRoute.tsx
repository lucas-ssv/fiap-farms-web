import { Navigate, Outlet } from 'react-router'

import { useAuth } from '@/presentation/contexts'

export function GuestRoute() {
  const { user } = useAuth()

  return user ? <Navigate to="/" replace /> : <Outlet />
}
