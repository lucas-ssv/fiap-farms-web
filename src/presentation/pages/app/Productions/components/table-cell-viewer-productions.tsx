import { useIsMobile } from '@/presentation/hooks'
import { z } from 'zod/v4'
import {
  Button,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  type ChartConfig,
} from '@/presentation/components/ui'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import { Loader2Icon } from 'lucide-react'
import { InputDate } from '@/presentation/components'
import type { ProductionModel } from '@/domain/models/production'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { LoadProducts } from '@/domain/usecases/product'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { ProductModel } from '@/domain/models/product'
import type {
  RemoveProduction,
  UpdateProduction,
} from '@/domain/usecases/production'
import { useAuth } from '@/presentation/contexts'

const schema = z.object({
  productId: z.string().optional(),
  status: z.enum(['in_production', 'harvested', 'waiting']).optional(),
  quantity: z.number().optional(),
  quantityProduced: z.number().optional(),
  unit: z.string().optional(),
  startDate: z.date().optional(),
  harvestDate: z.date().optional(),
})

const chartConfig = {
  concluded: {
    label: 'Concluída',
    color: 'var(--chart-1)',
  },
  missing: {
    label: 'Faltante',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

type UpdateProductionFormData = z.infer<typeof schema>

type Props = {
  item: ProductionModel
  loadProducts: LoadProducts
  updateProduction: UpdateProduction
  removeProduction: RemoveProduction
}

export function TableCellViewerProductions({
  item,
  loadProducts,
  updateProduction,
  removeProduction,
}: Props) {
  const { user } = useAuth()
  const isMobile = useIsMobile()
  const form = useForm<UpdateProductionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: item.product.id,
      status: item.status,
      quantity: item.quantity,
      quantityProduced: item.quantityProduced,
      unit: item.unit,
      startDate: (item.startDate as any).toDate(),
      harvestDate: (item.harvestDate as any).toDate(),
    },
  })
  const [products, setProducts] = useState<ProductModel[]>([])
  const percentageConcluded = Math.round(
    (item.quantityProduced / item.quantity) * 100
  )
  const chartData = [
    {
      concluida: item.quantityProduced
        ? ((item.quantityProduced / item.quantity) * 100).toFixed(2)
        : '0.00',
      faltante: item.quantity
        ? (
            ((item.quantity - item.quantityProduced) / item.quantity) *
            100
          ).toFixed(2)
        : 100,
    },
  ]

  const handleUpdateProduction = async (data: UpdateProductionFormData) => {
    try {
      await updateProduction.execute(item.id, {
        ...data,
        userId: user?.id,
        lastQuantity: data.quantityProduced,
      })
      toast.success('Produção atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar a produção. Tente novamente.')
    }
  }

  const handleRemoveProduction = async (productionId: string) => {
    try {
      await removeProduction.execute(productionId)
      toast.success('Produção removida com sucesso!')
    } catch (error) {
      toast.error('Erro ao remover a produção. Tente novamente.')
    }
  }

  const fetchProducts = useCallback(async () => {
    try {
      const products = await loadProducts.execute()
      setProducts(products)
    } catch (error) {
      toast.error('Erro ao carregar produtos. Tente novamente mais tarde.')
    }
  }, [loadProducts])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

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
                                {percentageConcluded}%
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 4}
                                className="fill-muted-foreground"
                              >
                                Concluída
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                  <RadialBar
                    dataKey="faltante"
                    fill="var(--muted)"
                    stackId="a"
                    cornerRadius={5}
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="concluida"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--chart-2)"
                    className="stroke-transparent stroke-2"
                  />
                </RadialBarChart>
              </ChartContainer>
              <Separator />
            </>
          )}
          <Form {...form}>
            <form id="form-update" className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                      <FormLabel>Produto</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o produto" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o produto" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <SelectItem value="in_production">
                            Em produção
                          </SelectItem>
                          <SelectItem value="completed">Concluída</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="quantityProduced"
                    render={() => (
                      <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                        <FormLabel>Quantidade produzida</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...form.register('quantityProduced', {
                              valueAsNumber: true,
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={() => (
                      <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                        <FormLabel>Quantidade a produzir</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...form.register('quantity', {
                              valueAsNumber: true,
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Unidade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a unidade" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="unit">Unidade</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                        <InputDate
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          label="Data de início"
                          onChange={(date) => {
                            field.onChange(date ? date : '')
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="harvestDate"
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                        <InputDate
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          label="Data de colheita"
                          onChange={(date) => {
                            field.onChange(date ? date : '')
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </div>
        <DrawerFooter>
          <Button
            form="form-update"
            className="cursor-pointer"
            onClick={form.handleSubmit(handleUpdateProduction)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" />
            )}
            Atualizar produção
          </Button>
          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={() => handleRemoveProduction(item.id)}
          >
            Excluir produção
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
