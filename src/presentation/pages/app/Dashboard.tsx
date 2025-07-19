import type { GoalModel } from '@/domain/models/goal'
import type { ProductModel } from '@/domain/models/product'
import type { ProductionModel } from '@/domain/models/production'
import type { SaleModel } from '@/domain/models/sale'
import type { WatchGoals } from '@/domain/usecases/goal'
import type { WatchProducts } from '@/domain/usecases/product'
import type { WatchProductions } from '@/domain/usecases/production'
import type { WatchSales } from '@/domain/usecases/sale'
import {
  DataProductsTable,
  ExpensesTypeChart,
  PopularProductsChart,
  ProductProfitChart,
} from '@/presentation/components'
import { Loader2Icon } from 'lucide-react'
import { lazy, Suspense, useEffect, useState } from 'react'

const RemoteSectionCards = lazy(() => import('remote_app/SectionCards'))

type Props = {
  watchProducts: WatchProducts
  watchSales: WatchSales
  watchGoals: WatchGoals
  watchProductions: WatchProductions
}

export function Dashboard({
  watchProducts,
  watchSales,
  watchGoals,
  watchProductions,
}: Props) {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [sales, setSales] = useState<SaleModel[]>([])
  const [goals, setGoals] = useState<GoalModel[]>([])
  const [productions, setProductions] = useState<ProductionModel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = watchProducts.execute((newProducts) => {
      setProducts(newProducts)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchProducts])

  useEffect(() => {
    const unsubscribe = watchSales.execute((newSales) => {
      setSales(newSales)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchSales])

  useEffect(() => {
    const unsubscribe = watchGoals.execute((newGoals) => {
      setGoals(newGoals)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchGoals])

  useEffect(() => {
    const unsubscribe = watchProductions.execute((newProductions) => {
      setProductions(newProductions)
      setIsLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [watchProductions])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2Icon className="animate-spin" />
      </div>
    )
  }

  return (
    <main>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2Icon className="animate-spin" />
          </div>
        }
      >
        <RemoteSectionCards sales={sales} products={products} goals={goals} />
      </Suspense>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4 px-6 mt-4">
        <ProductProfitChart products={products} sales={sales} />
        <PopularProductsChart products={products} />
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4 px-4 lg:px-6 mt-4">
        <DataProductsTable productions={productions} />
        <ExpensesTypeChart sales={sales} />
      </div>
    </main>
  )
}
