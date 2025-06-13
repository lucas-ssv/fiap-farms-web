import { Login, SignUp } from '@/presentation/pages/auth'
import { createBrowserRouter } from 'react-router'

export const authRoutes = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/signup',
    Component: SignUp,
  }
])
