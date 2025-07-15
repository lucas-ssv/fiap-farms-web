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
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type ChartConfig,
  Separator,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/presentation/components/ui'
import { InputDate } from '@/presentation/components'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'
import type { GoalModel } from '@/domain/models/goal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MoneyInput from '@/presentation/components/money-input'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { LoadProducts } from '@/domain/usecases/product'
import type { ProductModel } from '@/domain/models/product'
import type { UpdateGoal } from '@/domain/usecases/goal'
import { Loader2Icon } from 'lucide-react'

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

const schema = z
  .object({
    productId: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(['sales', 'production']).optional(),
    status: z.enum(['in_progress', 'done', 'active', 'inactive']).optional(),
    targetValue: z.number().optional(),
    currentValue: z.number().optional(),
    startDate: z
      .date()
      .optional()
      .refine((date) => date && date <= new Date(), {
        message: 'A data de início deve ser anterior ou igual à data atual',
      }),
    deadline: z
      .date()
      .optional()
      .refine((date) => date && date > new Date(), {
        message: 'A data final deve ser posterior à data de início',
      }),
  })
  .refine(
    (data) =>
      data.targetValue &&
      data.currentValue &&
      data.targetValue >= data.currentValue,
    {
      path: ['currentValue'],
      message: 'O valor alvo deve ser maior ao valor atual',
    }
  )

type UpdateGoalFormData = z.infer<typeof schema>

type Props = {
  item: GoalModel
  loadProducts: LoadProducts
  updateGoal: UpdateGoal
}

export function TableCellViewerGoals({
  item,
  loadProducts,
  updateGoal,
}: Props) {
  const isMobile = useIsMobile()
  const form = useForm<UpdateGoalFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: item.product.id,
      description: item.description,
      type: item.type,
      status: item.status,
      targetValue: item.targetValue,
      currentValue: item.currentValue,
      startDate: (item.startDate as any).toDate(),
      deadline: (item.deadline as any).toDate(),
    },
  })
  const [products, setProducts] = useState<ProductModel[]>([])
  const chartData = [
    {
      concluida: item.currentValue
        ? ((item.currentValue / item.targetValue) * 100).toFixed(2)
        : '0.00',
      faltante: item.targetValue
        ? (
            ((item.targetValue - item.currentValue) / item.targetValue) *
            100
          ).toFixed(2)
        : 100,
    },
  ]
  const percentageConcluded = item.currentValue
    ? ((item.currentValue / item.targetValue) * 100).toFixed(2)
    : '0.00'

  const handleUpdateGoal = async (data: UpdateGoalFormData) => {
    try {
      await updateGoal.execute(item.id, data)
      toast.success('Meta atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar a meta. Tente novamente.')
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite a descrição do produto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <MoneyInput
                    form={form}
                    label="Valor atual"
                    name="currentValue"
                    placeholder="R$ 100,00"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <MoneyInput
                    form={form}
                    label="Valor alvo"
                    name="targetValue"
                    placeholder="R$ 0,00"
                  />
                </div>
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
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                        <InputDate
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          label="Prazo final"
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
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                        <FormLabel>Tipo de meta</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o tipo de meta" />
                            </SelectTrigger>
                          </FormControl>
                          <FormMessage />
                          <SelectContent>
                            <SelectItem value="sales">Vendas</SelectItem>
                            <SelectItem value="production">Produção</SelectItem>
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
                      <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                          </FormControl>
                          <FormMessage />
                          <SelectContent>
                            <SelectItem value="in_progress">
                              Em progresso
                            </SelectItem>
                            <SelectItem value="done">Concluída</SelectItem>
                            <SelectItem value="active">Ativa</SelectItem>
                            <SelectItem value="inactive">Inativa</SelectItem>
                          </SelectContent>
                        </Select>
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
            onClick={form.handleSubmit(handleUpdateGoal)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" />
            )}
            Atualizar meta
          </Button>
          <Button variant="destructive">Excluir meta</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
