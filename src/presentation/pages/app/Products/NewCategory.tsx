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
import type { AddCategory } from '@/domain/usecases/category'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

type NewCategoryFormData = z.infer<typeof schema>

const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().optional(),
  image: z.file().optional(),
})

type Props = {
  addCategory: AddCategory
}

export function NewCategory({ addCategory }: Props) {
  const form = useForm<NewCategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      image: undefined,
    },
  })

  const onSubmit = async (data: NewCategoryFormData) => {
    try {
      await addCategory.execute(data)
      toast.success('Categoria adicionada com sucesso!')
      form.reset()
    } catch (error) {
      toast.error('Erro ao adicionar categoria. Tente novamente.')
    }
  }

  return (
    <main>
      <header className="px-4 lg:px-6 pt-2 pb-6">
        <h1 className="font-semibold text-base">Adicionar categoria</h1>
        <p className="text-sm text-custom-gray mt-1">
          Preencha os campos abaixo para cadastrar uma nova categoria
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
              <FormItem className="col-span-12">
                <FormLabel>Nome da categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome da categoria" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-9">
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Detalhes sobre a categoria" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                <FormLabel>Imagem da categoria</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      field.onChange(file)
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="col-span-12">
            <Button
              className="w-full md:w-auto"
              form="new-product-form"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              Adicionar categoria
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
