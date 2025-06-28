import { createBrowserRouter, RouterProvider } from 'react-router'

import { MakeLogin, MakeSignUp } from '@/main/factories/pages'
import { Dashboard } from '@/presentation/pages/app'
import {
  Categories,
  NewProduct,
  Products,
} from '@/presentation/pages/app/Products'
import { AppLayout, AuthLayout } from '@/presentation/pages/_layouts'
import { ProtectedRoute } from './ProtectedRoute'
import { GuestRoute } from './GuestRoute'

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <AppLayout />,
          children: [
            {
              path: '/',
              element: <Dashboard />,
            },
            {
              path: '/products',
              element: <Products />,
            },
            {
              path: '/products/new',
              element: <NewProduct />,
            },
            {
              path: 'categories',
              element: <Categories />,
            },
          ],
        },
      ],
    },
    {
      path: '/',
      element: <GuestRoute />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: '/login',
              element: <MakeLogin />,
            },
            {
              path: '/signup',
              element: <MakeSignUp />,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
