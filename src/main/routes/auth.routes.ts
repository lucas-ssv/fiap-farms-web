import { Login } from '@/presentation/pages/auth'
import { createBrowserRouter } from 'react-router'
import { MakeSignUp } from '@/main/factories/pages'

export const authRoutes = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/signup',
    Component: MakeSignUp,
  }
])
