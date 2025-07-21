import { PieChart, Pie, Cell } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  type ChartConfig,
} from './ui'
import type { ProductModel } from '@/domain/models/product'

const COLORS = [
  colors.green[50],
  colors.green[200],
  colors.green[300],
  colors.green[400],
  colors.green[500],
  colors.green[600],
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

type Props = {
  products: ProductModel[]
}

export function PopularProductsChart({ products }: Props) {
  const chartData = products.slice(0, COLORS.length).map((product) => ({
    product: product.name,
    amount: product.stock,
  }))

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Produtos Populares</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total de estoque dos produtos
          </span>
          <span className="@[540px]/card:hidden">Top produtos</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={chartData}
              nameKey="product"
              dataKey="amount"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {chartData[index].product.length > 12
                      ? chartData[index].product.substring(0, 12).concat('...')
                      : chartData[index].product}{' '}
                    ({value})
                  </text>
                )
              }}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  className="stroke-background hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
