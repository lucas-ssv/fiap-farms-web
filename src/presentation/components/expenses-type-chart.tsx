import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from './ui'
import type { SaleModel } from '@/domain/models/sale'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
  tablet: {
    label: 'Tablet',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

type Props = {
  sales: SaleModel[]
}

// Agrupa vendas por mês e soma o total vendido
function getSalesEvolutionData(sales: SaleModel[]) {
  const result: Record<string, number> = {}
  sales.forEach((sale) => {
    let date: Date | null = null
    if (sale.saleDate && typeof (sale.saleDate as any).toDate === 'function') {
      date = (sale.saleDate as any).toDate()
    } else if (sale.saleDate instanceof Date) {
      date = sale.saleDate
    } else if (typeof sale.saleDate === 'string') {
      date = new Date(sale.saleDate)
    }
    if (!date || isNaN(date.getTime())) return
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}`
    result[key] = (result[key] || 0) + sale.totalPrice
  })
  return Object.entries(result)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }))
}

export function ExpensesTypeChart({ sales }: Props) {
  const chartData = useMemo(() => getSalesEvolutionData(sales), [sales])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Evolução das Vendas</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total vendido por mês (R$)
          </span>
          <span className="@[540px]/card:hidden">Sazonalidade das vendas</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                // Mostra só o mês (ex: "10/2023")
                tickFormatter={(value) => {
                  const [year, month] = value.split('-')
                  return `${month}/${year}`
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                domain={[0, 'auto']}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="total"
                type="monotone"
                fill="url(#fillTotal)"
                fillOpacity={0.4}
                stroke="var(--primary)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
