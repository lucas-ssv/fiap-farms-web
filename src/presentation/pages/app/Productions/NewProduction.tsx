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
} from '@/presentation/components/ui'
import { InputDate } from '@/presentation/components'
import { Loader2Icon } from 'lucide-react'
import type { LoadProducts } from '@/domain/usecases/product'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { AddProduction } from '@/domain/usecases/production'

type NewProductionFormData = z.infer<typeof schema>

const schema = z.object({
  productId: z.string().min(1, 'Produto é obrigatório'),
  status: z.enum(['in_production', 'completed'], 'Status é obrigatório'),
  quantity: z
    .number('Quantidade deve ser um número')
    .min(1, 'Quantidade a produzir deve ser maior que zero'),
  quantityProduced: z.number('Quantidade produzida deve ser um número'),
  unit: z.string().min(1, 'Unidade é obrigatória'),
  startDate: z
    .date()
    .refine(
      (date) => date <= new Date(),
      'Data de início deve ser no passado ou presente'
    ),
  harvestDate: z
    .date()
    .refine((date) => date > new Date(), 'Data de colheita deve ser no futuro'),
})

type Props = {
  loadProducts: LoadProducts
  addProduction: AddProduction
}

export function NewProduction({ loadProducts, addProduction }: Props) {
  const form = useForm<NewProductionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: '',
      status: 'in_production',
      quantity: 0,
      quantityProduced: 0,
      unit: '',
      startDate: new Date(),
      harvestDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ),
    },
  })
  const [products, setProducts] = useState<LoadProducts.Result>([])

  const onSubmit = async (data: NewProductionFormData) => {
    try {
      await addProduction.execute(data)
      toast.success('Produção adicionada com sucesso!')
      form.reset()
    } catch (error) {
      toast.error('Erro ao adicionar produção. Tente novamente mais tarde.')
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
        <h1 className="font-semibold text-base">Nova produção</h1>
        <p className="text-sm text-custom-gray mt-1">
          Preencha os campos abaixo para adicionar uma nova produção
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
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="in_production">Em produção</SelectItem>
                    <SelectItem value="completed">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantityProduced"
            render={() => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>Quantidade produzida</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...form.register('quantityProduced', {
                      valueAsNumber: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={() => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>Quantidade a produzir</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...form.register('quantity', {
                      valueAsNumber: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>Unidade de medida</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a unidade de medida" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="kg">KG</SelectItem>
                    <SelectItem value="unit">Unidade</SelectItem>
                  </SelectContent>
                </Select>
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
            name="harvestDate"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormControl>
                  <InputDate
                    label="Previsão de colheita"
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
              Adicionar produção
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
