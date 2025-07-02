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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  type ChartConfig,
} from '@/presentation/components/ui'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { InputDate } from '@/presentation/components'

const schema = z.object({
  product: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    cost: z.number(),
    category: z.string(),
    stock: z.number(),
    minStock: z.number(),
    maxStock: z.number(),
    unit: z.string(),
    description: z.string(),
    image: z.url(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  farm: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string(),
    size: z.number(),
    unit: z.string(),
    description: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
  status: z.enum(['in_production', 'completed', 'cancelled']),
  quantityProduced: z.number(),
  unit: z.string(),
  startDate: z.date(),
  harvestDate: z.date(),
})

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function TableCellViewerProductions({
  item,
}: {
  item: z.infer<typeof schema>
}) {
  const isMobile = useIsMobile()
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
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
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
              <Label htmlFor="product">Nome</Label>
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
              <Label htmlFor="product">Nome</Label>
              <Select defaultValue={item.farm.id}>
                <SelectTrigger id="farm" className="w-full">
                  <SelectValue placeholder="Selecione a fazenda" />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status da produção</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Selecione o status atual" />
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
                <Label htmlFor="quantityProduced">Quantidade produzida</Label>
                <Input
                  type="number"
                  id="quantityProduced"
                  defaultValue={item.quantityProduced}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="unit">Unidade</Label>
                <Select defaultValue={item.unit}>
                  <SelectTrigger id="unit" className="w-full">
                    <SelectValue placeholder="Selecione a unidade" />
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
                <InputDate label="Data de início" />
              </div>
              <div className="flex flex-col gap-3">
                <InputDate label="Data da colheita (prevista)" />
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Atualizar produto</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="destructive">Excluir produto</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
