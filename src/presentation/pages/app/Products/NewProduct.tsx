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
import MoneyInput from '@/presentation/components/money-input'
import type { AddProduct } from '@/domain/usecases/product'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { useRef } from 'react'

type NewProductFormData = z.infer<typeof schema>

const schema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  unit: z.string().min(1, 'A unidade de medida é obrigatória'),
  categoryId: z.string().min(1, 'A categoria é obrigatória'),
  stock: z
    .number('Campo obrigatório')
    .min(0, 'O estoque não pode ser negativo'),
  minStock: z
    .number('Campo obrigatório')
    .min(0, 'O estoque mínimo não pode ser negativo'),
  maxStock: z
    .number('Campo obrigatório')
    .min(0, 'O estoque máximo não pode ser negativo'),
  description: z.string().optional(),
  image: z.file().optional(),
  price: z.number('Campo obrigatório').min(0, 'O preço não pode ser negativo'),
  cost: z.number('Campo obrigatório').min(0, 'O custo não pode ser negativo'),
})

type Props = {
  addProduct: AddProduct
}

export function NewProduct({ addProduct }: Props) {
  const form = useForm<NewProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      unit: '',
      categoryId: '',
      description: '',
      image: undefined,
    },
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onSubmit = async (data: NewProductFormData) => {
    try {
      await addProduct.execute(data)
      toast.success('Produto adicionado com sucesso!')
      form.reset()
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      toast.error('Erro ao adicionar produto. Tente novamente mais tarde.')
    }
  }

  return (
    <main>
      <header className="px-4 lg:px-6 pt-2 pb-6">
        <h1 className="font-semibold text-base">Adicionar produto</h1>
        <p className="text-sm text-custom-gray mt-1">
          Preencha os campos abaixo para cadastrar um novo produto
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
              <FormItem className="col-span-12 xl:col-span-6">
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a categoria" />
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
          <MoneyInput
            form={form}
            formItemClassName="col-span-12 md:col-span-6"
            label="Preço de venda (unidade)"
            name="price"
            placeholder="R$ 500,00"
          />
          <MoneyInput
            form={form}
            formItemClassName="col-span-12 md:col-span-6"
            label="Custo de produção (total)"
            name="cost"
            placeholder="R$ 100,00"
          />
          <FormField
            control={form.control}
            name="stock"
            render={() => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel>Estoque atual</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="500"
                    {...form.register('stock', { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minStock"
            render={() => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel>Estoque mínimo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="100"
                    {...form.register('minStock', { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxStock"
            render={() => (
              <FormItem className="col-span-12 md:col-span-4">
                <FormLabel>Estoque máximo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1000"
                    {...form.register('maxStock', { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="Detalhes sobre o produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
                <FormLabel>Imagem do produto</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      field.onChange(file)
                    }}
                    ref={fileInputRef}
                  />
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
              Adicionar produto
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
