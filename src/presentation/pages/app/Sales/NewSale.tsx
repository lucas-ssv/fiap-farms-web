import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
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
import MoneyInput from '@/presentation/components/money-input'
import { useCallback, useEffect, useState } from 'react'
import type { LoadProducts } from '@/domain/usecases/product'
import { toast } from 'sonner'
import type { LoadCustomers } from '@/domain/usecases/customer'
import type { AddSale } from '@/domain/usecases/sale'
import { useAuth } from '@/presentation/contexts'
import { Loader2Icon } from 'lucide-react'
import type { ProductModel } from '@/domain/models/product'

type NewProductFormData = z.infer<typeof schema>

const schema = z.object({
  productId: z.string().min(1, 'Selecione um produto'),
  customerId: z.string().optional(),
  quantity: z
    .number('Quantidade deve ser um número')
    .min(1, 'Quantidade deve ser maior que 0'),
  saleDate: z.date(),
  totalPrice: z.number().min(0, 'Valor total deve ser maior ou igual a 0'),
  unitPrice: z
    .number('Preço unitário deve ser um número')
    .min(1, 'Preço unitário é obrigatório'),
  discount: z
    .number('Desconto deve ser um número')
    .min(0, 'Desconto deve ser maior ou igual a 0')
    .max(15, 'Desconto não pode ser maior que 15%')
    .optional(),
  paymentMethod: z.string().min(1, 'Selecione uma forma de pagamento'),
  status: z.enum(['pending', 'completed', 'cancelled']),
  observations: z.string().optional(),
  unit: z.string().min(1, 'A unidade de medida é obrigatória'),
})

type Props = {
  addSale: AddSale
  loadProducts: LoadProducts
  loadCustomers: LoadCustomers
}

export function NewSale({ addSale, loadProducts, loadCustomers }: Props) {
  const { user } = useAuth()
  const form = useForm<NewProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: '',
      customerId: '',
      status: 'pending',
      unitPrice: 0,
      totalPrice: 0,
      quantity: 1,
      discount: 0,
      paymentMethod: '',
      saleDate: new Date(),
      observations: '',
      unit: '',
    },
  })
  const [products, setProducts] = useState<LoadProducts.Result>([])
  const [customers, setCustomers] = useState<LoadCustomers.Result>([])
  const [product, setProduct] = useState<ProductModel | undefined>(undefined)

  const quantity = useWatch({ control: form.control, name: 'quantity' })
  const unitPrice = useWatch({ control: form.control, name: 'unitPrice' })
  const discount = useWatch({ control: form.control, name: 'discount' })
  const productId = useWatch({ control: form.control, name: 'productId' })

  const onSubmit = async (data: NewProductFormData) => {
    try {
      if (data.quantity > product!.stock) {
        toast.warning('Quantidade maior que o estoque disponível.')
        return
      }

      await addSale.execute({
        userId: user!.id,
        ...data,
      })
      form.reset()
      toast.success('Venda efetuada com sucesso!')
      fetchProducts()
      setProduct(undefined)
    } catch (error) {
      toast.error('Erro ao efetuar venda. Tente novamente mais tarde.')
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

  const fetchCustomers = useCallback(async () => {
    try {
      const customers = await loadCustomers.execute()
      setCustomers(customers)
    } catch (error) {
      toast.error('Erro ao carregar clientes. Tente novamente mais tarde.')
    }
  }, [loadCustomers])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  useEffect(() => {
    if (quantity && unitPrice) {
      const totalPrice = quantity * unitPrice * (1 - (discount || 0) / 100)
      const current = form.getValues('totalPrice')

      if (current !== totalPrice) {
        form.setValue('totalPrice', totalPrice, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        })
      }
    }
  }, [quantity, unitPrice, discount, form])

  useEffect(() => {
    if (productId) {
      const product = products.find((p) => p.id === productId)
      if (product) {
        form.setValue('unitPrice', product.price, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        })
        form.setValue('unit', product.unit, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        })
        setProduct(product)
      }
    }
  }, [productId, products, form])

  return (
    <main>
      <header className="px-4 lg:px-6 pt-2 pb-6">
        <h1 className="font-semibold text-base">Nova venda</h1>
        <p className="text-sm text-custom-gray mt-1">
          Preencha os campos abaixo para efetuar uma nova venda
        </p>
      </header>
      <Separator />
      <Form {...form}>
        <form
          id="new-product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4 mt-6 px-4 lg:px-6"
        >
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="col-span-12 xl:col-span-4">
                <FormLabel>Produto</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                  </FormControl>
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
            name="customerId"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                <FormLabel>Cliente</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={() => (
              <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                <FormLabel>
                  Quantidade
                  {product && (
                    <span className="text-red-500">
                      Max. estoque ({product.stock})
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    {...form.register('quantity', { valueAsNumber: true })}
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
              <FormItem className="col-span-12 md:col-span-6 xl:col-span-2">
                <FormLabel>Unidade de medida</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a unidade de medida" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    {product && (
                      <SelectItem value={product.unit}>
                        {product.unit === 'kg' ? 'kg' : 'unidade'}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unitPrice"
            render={() => (
              <FormItem className="col-span-12 md:col-span-6">
                <MoneyInput
                  form={form}
                  label="Preço unitário"
                  name="unitPrice"
                  placeholder="R$ 0,00"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={() => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Desconto (%)</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    max={15}
                    type="number"
                    placeholder="0"
                    {...form.register('discount', { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormLabel>Forma de pagamento</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a forma de pagamento" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="debit">Débito</SelectItem>
                    <SelectItem value="credit">Crédito</SelectItem>
                    <SelectItem value="cash">Dinheiro</SelectItem>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-4">
                <FormLabel>Status da venda</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <FormMessage />
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="completed">Concluída</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="saleDate"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormControl>
                  <InputDate
                    label="Data da venda"
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Observações sobre a venda"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalPrice"
            render={() => (
              <FormItem className="col-span-12">
                <MoneyInput
                  form={form}
                  label="Valor total"
                  name="totalPrice"
                  placeholder="Valor total"
                  disabled
                />
              </FormItem>
            )}
          />
          <div className="col-span-12">
            <Button
              className="w-full cursor-pointer md:w-auto"
              form="new-product-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              Adicionar venda
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
