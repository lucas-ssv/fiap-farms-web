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
import { useEffect } from 'react'

type NewProductFormData = z.infer<typeof schema>

const schema = z.object({
  productId: z.string().min(1, 'Selecione um produto'),
  customerId: z.string().optional(),
  quantity: z.number().min(1, 'Quantidade deve ser maior que 0'),
  saleDate: z.date().optional(),
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

export function NewSale() {
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
  const quantity = useWatch({ control: form.control, name: 'quantity' })
  const unitPrice = useWatch({ control: form.control, name: 'unitPrice' })
  const discount = useWatch({ control: form.control, name: 'discount' })

  const onSubmit = (data: NewProductFormData) => {
    console.log('Form submitted:', data)
  }

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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o produto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
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
                <FormLabel>Quantidade</FormLabel>
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
                    <SelectItem value="kg">KG</SelectItem>
                    <SelectItem value="unit">Unidade</SelectItem>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            <Button className="w-full md:w-auto" form="new-product-form">
              Adicionar produto
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
