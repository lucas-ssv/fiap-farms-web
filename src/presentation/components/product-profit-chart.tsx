import { CartesianGrid, XAxis, Area, AreaChart } from 'recharts'

import { useIsMobile } from '@/presentation/hooks'
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
import type { ProductModel } from '@/domain/models/product'
import type { SaleModel } from '@/domain/models/sale'

const chartConfig = {
  profit: {
    label: 'Lucro Líquido',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

type Props = {
  products: ProductModel[]
  sales: SaleModel[]
}

export function ProductProfitChart({ products, sales }: Props) {
  const isMobile = useIsMobile()

  // Gerar dados de lucro por produto baseado nas vendas
  const chartData = products
    .map((product) => {
      const relatedSales = sales.filter(
        (sale) => sale.product.id === product.id
      )

      if (relatedSales.length === 0) return null

      const totalRevenue = relatedSales.reduce(
        (sum, sale) => sum + sale.totalPrice,
        0
      )

      // Se o custo é o custo total de produção, calcule o custo unitário
      const unitCost =
        product.stock > 0 ? product.cost / product.stock : product.cost

      const totalCost = relatedSales.reduce(
        (sum, sale) => sum + unitCost * sale.quantity,
        0
      )

      const profit = totalRevenue - totalCost

      return {
        date: product.name, // Usar o nome do produto como "data"
        profit: parseFloat(profit.toFixed(2)),
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null) // Remove valores null e fixa o tipo
    .sort((a, b) => b.profit - a.profit) // Ordena do maior para o menor lucro

  // Para produtos, não precisamos filtrar por data, então usamos todos os dados
  const filteredData = chartData

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Lucro por Produto</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            {filteredData.some((p) => p.profit < 0)
              ? '⚠️ Alguns produtos estão com prejuízo - verifique os custos'
              : 'Visão geral do lucro líquido por produto'}
          </span>
          <span className="@[540px]/card:hidden">
            {filteredData.some((p) => p.profit < 0)
              ? '⚠️ Prejuízos detectados'
              : 'Lucro por produto'}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 0}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  formatter={(value) => [
                    `R$ ${Number(value).toFixed(2)}`,
                    ' Lucro Líquido',
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="profit"
              type="natural"
              fill="url(#fillProfit)"
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
