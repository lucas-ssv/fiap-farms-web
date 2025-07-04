import { createBrowserRouter, RouterProvider } from 'react-router'

import { MakeLogin, MakeSignUp } from '@/main/factories/pages/auth'
import { Dashboard } from '@/presentation/pages/app'
import { Categories, Products } from '@/presentation/pages/app/Products'
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
import { Productions } from '@/presentation/pages/app/Productions'
import { MakeNewCategory, MakeNewProduct } from '@/main/factories/pages/app'

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
              element: <MakeNewProduct />,
            },
            {
              path: 'categories',
              element: <Categories />,
            },
            {
              path: 'categories/new',
              element: <MakeNewCategory />,
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
            {
              path: '/productions',
              element: <Productions />,
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
