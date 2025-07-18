import { TrendingDown, TrendingUp } from 'lucide-react'

import {
  Badge,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui'
import type { SaleModel } from '@/domain/models/sale'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import type { ProductModel } from '@/domain/models/product'
import type { GoalModel } from '@/domain/models/goal'

type Props = {
  sales: SaleModel[]
  products: ProductModel[]
  goals: GoalModel[]
}

export function SectionCards({ sales, products, goals }: Props) {
  const profitData = useMemo(() => {
    const now = dayjs()
    const thisMonth = now.month() + 1
    const thisYear = now.year()
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1
    const lastMonthYear = thisMonth === 1 ? thisYear - 1 : thisYear

    const calcProfit = (month: number, year: number) => {
      return sales?.reduce((acc, sale) => {
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

  const totalSold = useMemo(() => {
    let totalKg = 0
    let totalUnits = 0
    let productName = ''

    for (const sale of sales) {
      const product = products?.find((p) => p.id === sale.product.id)
      if (!product) continue

      const saleDate = dayjs.unix((sale.saleDate as any).seconds)
      if (
        saleDate.month() + 1 !== new Date().getMonth() + 1 ||
        saleDate.year() !== new Date().getFullYear()
      )
        continue

      const quantity = sale.quantity ?? 0
      const unit = product.unit.toLowerCase()
      if (productName === '') productName = product.name

      if (unit.includes('kg')) totalKg += quantity
      else if (unit.includes('un') || unit.includes('uni'))
        totalUnits += quantity
    }

    if (totalKg >= totalUnits) {
      return { value: totalKg, label: 'kg', productName }
    } else {
      return { value: totalUnits, label: 'unidades', productName }
    }
  }, [sales, products])

  const lowStockCount = useMemo(() => {
    return products?.filter((product) => {
      return product.stock < product.minStock!
    }).length
  }, [products])

  const closestGoal = useMemo(() => {
    if (!goals || goals.length === 0) return null

    return goals
      .map((goal) => ({
        ...goal,
        progress:
          goal.targetValue === 0 ? 0 : goal.currentValue / goal.targetValue,
      }))
      .sort((a, b) => b.progress - a.progress)[0]
  }, [goals])

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Lucro Total (mês atual)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'BRL',
            }).format(profitData.profit)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {profitData.isPositive ? <TrendingUp /> : <TrendingDown />}
              {profitData.isPositive ? '+' : '-'}
              {profitData.percentage.toFixed(1)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {profitData.isPositive
              ? 'Lucro crescente este mês'
              : 'Lucro em queda este mês'}{' '}
            {profitData.isPositive ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            {profitData.isPositive
              ? 'Continue com o bom trabalho!'
              : 'Revise suas despesas e vendas.'}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Maior venda</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalSold.value} {totalSold.label}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalSold.value} {totalSold.label} vendidas este mês
          </div>
          <div className="text-muted-foreground">
            Produto: {totalSold.productName}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Produtos com estoque baixo</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {lowStockCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {lowStockCount} produtos com estoque abaixo do mínimo
          </div>
          <div className="text-muted-foreground">
            Revise o estoque e reabasteça os produtos
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Meta a ser atingida</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {closestGoal
              ? `${(closestGoal.progress * 100).toFixed(1)}%`
              : 'Nenhuma meta definida'}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {closestGoal
              ? `Meta: ${closestGoal.product.name} ${closestGoal.currentValue} / ${closestGoal.targetValue}`
              : 'Defina uma meta para acompanhar o progresso'}
            {closestGoal && (
              <Badge variant="outline">
                {closestGoal.progress >= 1 ? 'Concluída' : 'Em progresso'}
              </Badge>
            )}
          </div>
          <div className="text-muted-foreground">
            {closestGoal
              ? `Progresso: ${(closestGoal.progress * 100).toFixed(1)}% ${
                  closestGoal.description
                }`
              : 'Defina uma meta para começar a acompanhar.'}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
