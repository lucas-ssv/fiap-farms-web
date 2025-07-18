import type { GoalModel } from '@/domain/models/goal'
import type { ProductModel } from '@/domain/models/product'
import type { SaleModel } from '@/domain/models/sale'
import type { WatchGoals } from '@/domain/usecases/goal'
import type { WatchProducts } from '@/domain/usecases/product'
import type { WatchSales } from '@/domain/usecases/sale'
import {
  DataProductsTable,
  ExpensesTypeChart,
  GoalsChart,
  PopularProductsChart,
  ProductProfitChart,
  SectionCards,
  SellEvolutionChart,
  StockDistribuitionCategoryChart,
} from '@/presentation/components'
import { Loader2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  watchProducts: WatchProducts
  watchSales: WatchSales
  watchGoals: WatchGoals
}

export function Dashboard({ watchProducts, watchSales, watchGoals }: Props) {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [sales, setSales] = useState<SaleModel[]>([])
  const [goals, setGoals] = useState<GoalModel[]>([])
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2Icon className="animate-spin" />
      </div>
    )
  }

  return (
    <main>
      <SectionCards sales={sales} products={products} goals={goals} />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4 px-6 mt-4">
        <ProductProfitChart products={products} sales={sales} />
        <PopularProductsChart />
      </div>
      <DataProductsTable />
      <div className="grid lg:grid-cols-2 gap-4 px-4 lg:px-6 mt-4">
        <SellEvolutionChart />
        <GoalsChart />
      </div>
      <div className="grid lg:grid-cols-[1fr_2fr] gap-4 px-4 lg:px-6 mt-4">
        <ExpensesTypeChart />
        <StockDistribuitionCategoryChart />
      </div>
    </main>
  )
}
