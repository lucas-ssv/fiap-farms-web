import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'

import {
  Button,
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
  Textarea,
} from '@/presentation/components/ui'
import { InputDate } from '@/presentation/components'
import type { AddGoal } from '@/domain/usecases/goal'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import type { LoadProducts } from '@/domain/usecases/product'
import { useCallback, useEffect, useState } from 'react'
import type { ProductModel } from '@/domain/models/product'
import MoneyInput from '@/presentation/components/money-input'
import { useAuth } from '@/presentation/contexts'

type NewGoalFormData = z.infer<typeof schema>

const schema = z
  .object({
    productId: z.string().min(1, 'Selecione um produto'),
    description: z.string().optional(),
    type: z.enum(['sales', 'production'], 'Selecione o tipo de meta'),
    status: z.enum(
      ['in_progress', 'done', 'active', 'inactive'],
      'Selecione o status da meta'
    ),
    targetValue: z
      .number('O valor alvo deve ser um número')
      .min(1, 'O valor alvo deve ser maior que zero'),
    currentValue: z
      .number('O valor atual deve ser um número')
      .min(0, 'O valor atual não pode ser negativo'),
    startDate: z
      .date('A data de início deve ser uma data válida')
      .refine((date) => date <= new Date(), {
        message: 'A data de início deve ser anterior ou igual à data atual',
      }),
    deadline: z
      .date('A data final deve ser uma data válida')
      .refine((date) => date > new Date(), {
        message: 'A data final deve ser posterior à data de início',
      }),
  })
  .refine((data) => data.targetValue > data.currentValue, {
    path: ['currentValue'],
    message: 'O valor alvo deve ser maior ao valor atual',
  })

type Props = {
  loadProducts: LoadProducts
  addGoal: AddGoal
}

export function NewGoal({ loadProducts, addGoal }: Props) {
  const { user } = useAuth()
  const form = useForm<NewGoalFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: '',
      description: '',
      type: 'sales',
      status: 'in_progress',
      targetValue: 0,
      currentValue: 0,
      startDate: new Date(),
      deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
    },
  })
  const [products, setProducts] = useState<ProductModel[]>([])
  const type = form.watch('type')

  const onSubmit = async (data: NewGoalFormData) => {
    try {
      await addGoal.execute({
        ...data,
        userId: user!.id,
      })
      toast.success('Meta adicionada com sucesso!')
      form.reset()
    } catch (error) {
      toast.error('Erro ao adicionar meta. Tente novamente mais tarde.')
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
    <main>
      <header className="px-4 lg:px-6 pt-2 pb-6">
        <h1 className="font-semibold text-base">Nova meta</h1>
        <p className="text-sm text-custom-gray mt-1">
          Preencha os campos abaixo para adicionar uma nova meta
        </p>
      </header>
      <Separator />
      <Form {...form}>
        <form
          id="new-goal-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4 mt-6 px-4 lg:px-6"
        >
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Produto</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Tipo de meta</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva informações sobre a meta escolhida"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetValue"
            render={() => (
              <FormItem className="col-span-12 md:col-span-6">
                {type === 'sales' ? (
                  <MoneyInput
                    form={form}
                    label="Valor alvo"
                    name="targetValue"
                    placeholder="R$ 500,00"
                  />
                ) : (
                  <>
                    <FormLabel>Valor alvo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1000"
                        {...form.register('targetValue', {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentValue"
            render={() => (
              <FormItem className="col-span-12 md:col-span-6">
                {type === 'sales' ? (
                  <MoneyInput
                    form={form}
                    label="Valor atual"
                    name="currentValue"
                    placeholder="R$ 0,00"
                  />
                ) : (
                  <>
                    <FormLabel>Valor atual</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...form.register('currentValue', {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormControl>
                  <InputDate
                    label="Data de início"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormControl>
                  <InputDate
                    label="Prazo final"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-12">
            <Button
              className="w-full cursor-pointer md:w-auto"
              form="new-goal-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              Adicionar meta
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
