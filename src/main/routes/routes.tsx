import { createBrowserRouter, RouterProvider } from 'react-router'

import { MakeLogin, MakeSignUp } from '@/main/factories/pages'
import { Dashboard } from '@/presentation/pages/app'
import {
  Categories,
  NewCategory,
  NewProduct,
  Products,
} from '@/presentation/pages/app/Products'
import { AppLayout, AuthLayout } from '@/presentation/pages/_layouts'
import { ProtectedRoute } from './ProtectedRoute'
import { GuestRoute } from './GuestRoute'
import {
  Customers,
  NewCustomer,
  NewSale,
  Sales,
} from '@/presentation/pages/app/Sales'
import { Goals, NewGoal } from '@/presentation/pages/app/Goals'

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
            {
              path: 'categories/new',
              element: <NewCategory />,
            },
            {
              path: '/sales',
              element: <Sales />,
            },
            {
              path: '/sales/new',
              element: <NewSale />,
            },
            {
              path: '/customers',
              element: <Customers />,
            },
            {
              path: '/customers/new',
              element: <NewCustomer />,
            },
            {
              path: '/goals',
              element: <Goals />,
            },
            {
              path: '/goals/new',
              element: <NewGoal />,
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
