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
  Separator,
} from '@/presentation/components/ui'
import { toast } from 'sonner'
import { useCallback, useEffect } from 'react'
import type { AddCustomer } from '@/domain/usecases/customer'
import { Loader2Icon } from 'lucide-react'

type NewCustomerFormData = z.infer<typeof schema>

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.email('Email inválido'),
  phone: z.string().optional(),
  postalCode: z.string('CEP é obrigatório').min(8, 'CEP deve ter 8 dígitos'),
  city: z.string('Cidade é obrigatória'),
  state: z.string('Estado é obrigatório'),
  neighborhood: z.string('Bairro é obrigatório'),
  address: z.string('Endereço é obrigatório'),
  addressNumber: z.number('Número é obrigatório'),
  addressComplement: z.string().optional(),
})

type Props = {
  addCustomer: AddCustomer
}

export function NewCustomer({ addCustomer }: Props) {
  const form = useForm<NewCustomerFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      postalCode: '',
      city: '',
      state: '',
      neighborhood: '',
      address: '',
    },
  })
  const watchPostalCode = form.watch('postalCode')

  const onSubmit = async (data: NewCustomerFormData) => {
    try {
      await addCustomer.execute(data)
      toast.success('Cliente adicionado com sucesso!')
      form.reset()
    } catch (error) {
      toast.error(
        'Erro ao adicionar cliente. Verifique os dados e tente novamente.'
      )
    }
  }

  const handlePostalCodeChange = useCallback(async () => {
    try {
      const postalCode = watchPostalCode.replace(/\D/g, '')

      if (postalCode.length === 8) {
        const response = await fetch(
          `https://viacep.com.br/ws/${watchPostalCode}/json/`
        )
        const data = await response.json()

        if (data.erro) {
          toast.error('CEP inválido')
          return
        }

        form.setValue('address', data.logradouro || '')
        form.setValue('neighborhood', data.bairro || '')
        form.setValue('city', data.localidade || '')
        form.setValue('state', data.uf || '')
        form.setValue('postalCode', data.cep || '')
      }
    } catch (error) {
      toast.error('Erro ao buscar o CEP')
    }
  }, [watchPostalCode, form])

  useEffect(() => {
    handlePostalCodeChange()
  }, [handlePostalCodeChange, watchPostalCode])

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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressNumber"
            render={() => (
              <FormItem className="col-span-12 md:col-span-2">
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o número"
                    {...form.register('addressNumber', { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressComplement"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o complemento" {...field} />
                </FormControl>
                <FormMessage />
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
              Adicionar cliente
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
