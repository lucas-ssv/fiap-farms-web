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
import { useState } from 'react'

type NewProductFormData = z.infer<typeof schema>

const schema = z.object({
  productName: z.string().min(1, 'O nome é obrigatório'),
  customerName: z.string().optional(),
  quantity: z.number().min(1, 'A quantidade deve ser maior que zero'),
  price: z.string().min(1, 'O preço é obrigatório'),
  discount: z.string().optional(),
  paymentMethod: z.string().min(1, 'O método de pagamento é obrigatório'),
  status: z.string().min(1, 'O status é obrigatório'),
  saleDate: z.string().optional(),
  observations: z.string().optional(),
  totalValue: z.string().min(1, 'O valor total é obrigatório').optional(),
})

export function NewSale() {
  const form = useForm<NewProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productName: '',
      customerName: '',
      quantity: 1,
      price: '',
      discount: '',
      paymentMethod: '',
      status: '',
      saleDate: '',
      observations: '',
      totalValue: '',
    },
  })
  const [date, setDate] = useState<Date | undefined>(undefined)

  const onSubmit = (data: NewProductFormData) => {
    console.log('Form submitted:', data)
  }

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
            name="productName"
            render={({ field }) => (
              <FormItem className="col-span-12 xl:col-span-6">
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
            name="customerName"
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
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Preço unitário</FormLabel>
                <FormControl>
                  <Input placeholder="R$ 0,00" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Desconto (%)</FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    max={15}
                    type="number"
                    placeholder="0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
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
            name="status"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
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
            name="saleDate"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormControl>
                  <InputDate
                    label="Data da venda"
                    date={date}
                    setDate={setDate}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observations"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-12">
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Observações sobre a venda"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalValue"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-12">
                <FormLabel>Valor total</FormLabel>
                <FormControl>
                  <Input placeholder="Valor total" disabled {...field} />
                </FormControl>
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
