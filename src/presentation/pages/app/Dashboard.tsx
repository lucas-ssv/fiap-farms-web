import type { ProductModel } from '@/domain/models/product'
import type { SaleModel } from '@/domain/models/sale'
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
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'

type Props = {
  watchProducts: WatchProducts
  watchSales: WatchSales
}

export function Dashboard({ watchProducts, watchSales }: Props) {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [sales, setSales] = useState<SaleModel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const profitData = useMemo(() => {
    const now = dayjs()
    const thisMonth = now.month() + 1
    const thisYear = now.year()
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1
    const lastMonthYear = thisMonth === 1 ? thisYear - 1 : thisYear

    const calcProfit = (month: number, year: number) => {
      return sales.reduce((acc, sale) => {
        const saleDate = dayjs.unix((sale.saleDate as any).seconds)
        if (saleDate.month() + 1 !== month || saleDate.year() !== year)
          return acc

        const cost = sale.product.cost ?? 0 // em centavos
        const unitPrice = sale.unitPrice ?? 0 // em reais
        const unitProfit = unitPrice - cost / 100

        return acc + unitProfit * sale.quantity
      }, 0)
    }

    const currentProfit = calcProfit(thisMonth, thisYear)
    const previousProfit = calcProfit(lastMonth, lastMonthYear)
    const diff = currentProfit - previousProfit
    const percentage =
      previousProfit === 0 ? 100 : (diff / previousProfit) * 100

    return {
      profit: currentProfit,
      percentage: Math.abs(percentage),
      isPositive: diff >= 0,
    }
  }, [sales])

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2Icon className="animate-spin" />
      </div>
    )
  }

  return (
    <main>
      <SectionCards profitData={profitData} />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-4 px-6 mt-4">
        <ProductProfitChart />
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
