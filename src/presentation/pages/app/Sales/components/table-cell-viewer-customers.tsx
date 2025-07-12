import { useIsMobile } from '@/presentation/hooks'
import { z } from 'zod/v4'
import {
  Button,
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
} from '@/presentation/components/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import type { RemoveCustomer, UpdateCustomer } from '@/domain/usecases/customer'
import type { CustomerModel } from '@/domain/models/customer'
import { Loader2Icon } from 'lucide-react'

const schema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string().optional(),
  postalCode: z.string(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  address: z.string(),
  addressNumber: z.number(),
  addressComplement: z.string().optional(),
})

type UpdateCustomerFormData = z.infer<typeof schema>

type Props = {
  item: CustomerModel
  updateCustomer: UpdateCustomer
  removeCustomer: RemoveCustomer
}

export function TableCellViewerCustomers({
  item,
  updateCustomer,
  removeCustomer,
}: Props) {
  const form = useForm<UpdateCustomerFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item.name,
      email: item.email,
      phone: item.phone,
      postalCode: item.postalCode,
      city: item.city,
      state: item.state,
      neighborhood: item.neighborhood,
      address: item.address,
      addressNumber: item.addressNumber,
      addressComplement: item.addressComplement,
    },
  })
  const isMobile = useIsMobile()
  const watchPostalCode = form.watch('postalCode')

  const handleUpdateCustomer = async () => {
    const data = form.getValues()

    try {
      await updateCustomer.execute(item.id, data)
      toast.success('Cliente atualizado com sucesso!')
    } catch (error) {
      toast.error(
        'Erro ao atualizar cliente. Verifique os dados e tente novamente.'
      )
    }
  }

  const handleRemoveCustomer = async (customerId: string) => {
    try {
      await removeCustomer.execute(customerId)
      toast.success('Cliente removido com sucesso!')
    } catch (error) {
      toast.error('Erro ao remover cliente. Tente novamente.')
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
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form {...form}>
            <form id="form-update" className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Nome do cliente</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do cliente"
                          {...field}
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o e-mail do cliente"
                          {...field}
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Telefone / Celular</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o telefone/celular do cliente"
                          {...field}
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
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o CEP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="col-span-12 xl:col-span-6">
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite a cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="col-span-12 xl:col-span-6">
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o estado" {...field} />
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
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="flex flex-col gap-3 col-span-8">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-12 xl:col-span-6">
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite a rua" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-3 col-span-4">
                  <FormField
                    control={form.control}
                    name="addressNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-12 xl:col-span-6">
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Digite o número"
                            {...field}
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
                  name="addressComplement"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o complemento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <DrawerFooter>
          <Button
            className="cursor-pointer"
            form="form-update"
            onClick={form.handleSubmit(handleUpdateCustomer)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" />
            )}
            Atualizar cliente
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleRemoveCustomer(item.id)}
          >
            Excluir cliente
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
