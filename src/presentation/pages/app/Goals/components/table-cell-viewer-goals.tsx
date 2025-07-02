import { useIsMobile } from '@/presentation/hooks'
import { z } from 'zod/v4'
import {
  Button,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label as CustomLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type ChartConfig,
  Separator,
} from '@/presentation/components/ui'
import { InputDate } from '@/presentation/components'
import React from 'react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { TrendingUp } from 'lucide-react'

const chartData = [{ month: 'january', desktop: 1260, mobile: 570 }]
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

const schema = z.object({
  id: z.string(),
  product: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    price: z.string(),
    category: z.object({
      id: z.string(),
      name: z.string(),
    }),
  }),
  description: z.string().optional(),
  type: z.enum(['sales', 'production']),
  status: z.enum(['pending', 'completed', 'canceled']),
  targetValue: z.number(),
  currentValue: z.number(),
  startDate: z.date(),
  deadLine: z.date(),
})

export function TableCellViewerGoals({
  item,
}: {
  item: z.infer<typeof schema>
}) {
  const isMobile = useIsMobile()
  const totalVisitors = chartData[0].desktop + chartData[0].mobile
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined)
  const [deadLine, setDeadLine] = React.useState<Date | undefined>(undefined)

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.product.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.product.name}</DrawerTitle>
          <DrawerDescription>
            Lucro unitário nos últimos 6 meses
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <RadialBarChart
                  data={chartData}
                  endAngle={180}
                  innerRadius={80}
                  outerRadius={130}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 16}
                                className="fill-foreground text-2xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 4}
                                className="fill-muted-foreground"
                              >
                                Visitors
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                  <RadialBar
                    dataKey="desktop"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-desktop)"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="mobile"
                    fill="var(--color-mobile)"
                    stackId="a"
                    cornerRadius={5}
                    className="stroke-transparent stroke-2"
                  />
                </RadialBarChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Tendência de alta de 5,2% neste mês
                  <TrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <CustomLabel htmlFor="product">Produto</CustomLabel>
              <Select defaultValue={item.product.id}>
                <SelectTrigger id="product" className="w-full">
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Category A">Categoria A</SelectItem>
                  <SelectItem value="Executive Summary">
                    Executive Summary
                  </SelectItem>
                  <SelectItem value="Technical Approach">
                    Technical Approach
                  </SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Capabilities">Capabilities</SelectItem>
                  <SelectItem value="Focus Documents">
                    Focus Documents
                  </SelectItem>
                  <SelectItem value="Narrative">Narrative</SelectItem>
                  <SelectItem value="Cover Page">Cover Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <CustomLabel htmlFor="description">Descrição</CustomLabel>
              <Input id="description" defaultValue={item.description} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <CustomLabel htmlFor="currentValue">Valor atual</CustomLabel>
                <Input id="currentValue" defaultValue={item.currentValue} />
              </div>
              <div className="flex flex-col gap-3">
                <CustomLabel htmlFor="targetValue">Valor alvo</CustomLabel>
                <Input id="targetValue" defaultValue={item.targetValue} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <InputDate
                  label="Data de início"
                  date={startDate}
                  setDate={setStartDate}
                />
              </div>
              <div className="flex flex-col gap-3">
                <InputDate
                  label="Prazo final"
                  date={deadLine}
                  setDate={setDeadLine}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <CustomLabel htmlFor="type">Tipo de meta</CustomLabel>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Selecione o tipo de meta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Category A">Categoria A</SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <CustomLabel htmlFor="status">Status</CustomLabel>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Category A">Categoria A</SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Atualizar meta</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="destructive">Excluir meta</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
