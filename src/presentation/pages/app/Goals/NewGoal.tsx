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

type NewGoalFormData = z.infer<typeof schema>

const schema = z.object({
  productId: z.string().min(1, 'O ID do produto é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  type: z.enum(['sales', 'production']),
  status: z.enum(['active', 'inactive']),
  targetValue: z
    .number()
    .min(100, 'O valor alvo deve ser maior ou igual a R$ 100,00'),
  currentValue: z
    .number()
    .min(0, 'O valor atual deve ser maior ou igual a zero'),
  startDate: z.date('A data de início é obrigatória'),
  deadline: z.date('O prazo final é obrigatório'),
})

export function NewGoal() {
  const form = useForm<NewGoalFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: '',
      description: '',
      type: 'sales',
      status: 'active',
      targetValue: 0,
      currentValue: 0,
      startDate: undefined,
      deadline: undefined,
    },
  })

  const onSubmit = (data: NewGoalFormData) => {
    console.log('Form submitted:', data)
  }

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
          id="new-product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-4 mt-6 px-4 lg:px-6"
        >
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
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
                  <FormMessage />
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
            name="type"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Tipo de meta</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
                <FormLabel>Valor alvo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="R$ 500,00"
                    {...form.register('targetValue', { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentValue"
            render={() => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Valor atual</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="R$ 0,00"
                    {...form.register('currentValue', { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
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
            <Button className="w-full md:w-auto" form="new-product-form">
              Adicionar meta
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
