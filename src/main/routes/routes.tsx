import { RouterProvider } from 'react-router'
import { authRoutes } from './auth.routes'

export function Routes() {
  return <RouterProvider router={authRoutes} />
}
