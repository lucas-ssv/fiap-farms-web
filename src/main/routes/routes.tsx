import { createBrowserRouter, RouterProvider } from 'react-router'

import { MakeLogin, MakeSignUp } from '@/main/factories/pages/auth'
import { AuthLayout } from '@/presentation/pages/_layouts'
import { ProtectedRoute } from './ProtectedRoute'
import { GuestRoute } from './GuestRoute'
import {
  MakeCategories,
  MakeNewCategory,
  MakeNewProduct,
  MakeProducts,
} from '@/main/factories/pages/app/Products'
import {
  MakeCustomers,
  MakeNewCustomer,
  MakeNewSale,
  MakeSales,
} from '@/main/factories/pages/app/Sales'
import { MakeGoals, MakeNewGoal } from '@/main/factories/pages/app/Goals'
import {
  MakeNewProduction,
  MakeProductions,
} from '@/main/factories/pages/app/Productions'
import { MakeAppLayout } from '@/main/factories/pages/_layouts'
import { MakeDashboard } from '@/main/factories/pages/app'

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <MakeAppLayout />,
          children: [
            {
              path: '/',
              element: <MakeDashboard />,
            },
            {
              path: '/products',
              element: <MakeProducts />,
            },
            {
              path: '/products/new',
              element: <MakeNewProduct />,
            },
            {
              path: 'categories',
              element: <MakeCategories />,
            },
            {
              path: 'categories/new',
              element: <MakeNewCategory />,
            },
            {
              path: '/sales',
              element: <MakeSales />,
            },
            {
              path: '/sales/new',
              element: <MakeNewSale />,
            },
            {
              path: '/customers',
              element: <MakeCustomers />,
            },
            {
              path: '/customers/new',
              element: <MakeNewCustomer />,
            },
            {
              path: '/goals',
              element: <MakeGoals />,
            },
            {
              path: '/goals/new',
              element: <MakeNewGoal />,
            },
            {
              path: '/productions',
              element: <MakeProductions />,
            },
            {
              path: '/productions/new',
              element: <MakeNewProduction />,
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
