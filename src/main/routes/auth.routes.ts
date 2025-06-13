import { createBrowserRouter } from 'react-router'
import { MakeLogin, MakeSignUp } from '@/main/factories/pages'

export const authRoutes = createBrowserRouter([
  {
    path: '/login',
    Component: MakeLogin,
  },
  {
    path: '/signup',
    Component: MakeSignUp,
  }
])
