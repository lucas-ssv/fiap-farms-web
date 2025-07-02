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
  Separator,
} from '@/presentation/components/ui'

type NewCustomerFormData = z.infer<typeof schema>

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  postalCode: z.string(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.number(),
  complement: z.string().optional(),
})

export function NewCustomer() {
  const form = useForm<NewCustomerFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      postalCode: '',
      city: '',
      state: '',
      neighborhood: '',
      street: '',
      number: 0,
    },
  })

  const onSubmit = (data: NewCustomerFormData) => {
    console.log('Form submitted:', data)
  }

  return (
    <main>
      <header className="px-4 lg:px-6 pt-2 pb-6">
        <h1 className="font-semibold text-base">Novo cliente</h1>
        <p className="text-sm text-custom-gray mt-1">
          Preencha os campos abaixo para adicionar um novo cliente
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
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-8">
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome completo" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4">
                <FormLabel>Telefone / Celular</FormLabel>
                <FormControl>
                  <Input placeholder="11 95555-5555" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o e-mail" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator className="col-span-12 my-2" />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o CEP" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a cidade" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o estado" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o bairro" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a rua" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-2">
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o número" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o complemento" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="col-span-12">
            <Button className="w-full md:w-auto" form="new-product-form">
              Adicionar cliente
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
