import React from 'react'
import { useIsMobile } from '@/presentation/hooks'
import { z } from 'zod/v4'
import {
  Button,
  Drawer,
  DrawerClose,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui'
import type { ProductModel } from '@/domain/models/product'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MoneyInput from '@/presentation/components/money-input'
import type { LoadCategories } from '@/domain/usecases/category'
import type { UpdateProduct } from '@/domain/usecases/product'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

const schema = z.object({
  name: z.string().optional(),
  categoryId: z.string().optional(),
  stock: z
    .number()
    .int()
    .min(0, 'O estoque deve ser um número positivo')
    .optional(),
  minStock: z
    .number()
    .int()
    .min(0, 'O estoque mínimo deve ser um número positivo')
    .optional(),
  maxStock: z
    .number()
    .int()
    .min(0, 'O estoque máximo deve ser um número positivo')
    .optional(),
  price: z.number().positive('O preço deve ser um valor positivo').optional(),
  cost: z.number().positive('O custo deve ser um valor positivo').optional(),
  description: z.string().optional(),
  unit: z.string().optional(),
  image: z.file().optional().or(z.url('A imagem deve ser uma URL válida')),
})

type UpdateProductFormData = z.infer<typeof schema>

type Props = {
  item: ProductModel
  categories: LoadCategories.Result
  updateProduct: UpdateProduct
}

export function TableCellViewerProducts({
  item,
  categories,
  updateProduct,
}: Props) {
  const isMobile = useIsMobile()
  const form = useForm<UpdateProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item.name,
      categoryId: item.category.id,
      stock: item.stock,
      minStock: item.minStock,
      maxStock: item.maxStock,
      price: item.price,
      cost: item.cost,
      description: item.description,
      unit: item.unit,
      image: item?.image,
    },
  })
  const [image, setImage] = React.useState<string | undefined>(item.image)

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        form.setValue('image', file)
      }
      reader.readAsDataURL(file)
    } else {
      setImage(undefined)
      form.setValue('image', undefined)
    }
  }

  const handleUpdateProduct = async () => {
    const data = form.getValues()

    try {
      await updateProduct.execute(item.id, data)
      toast.success('Produto atualizado com sucesso!')
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      toast.error('Erro ao atualizar o produto. Tente novamente.')
    }
  }

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground cursor-pointer w-fit px-0 text-left"
        >
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
              <div>
                <Input
                  type="file"
                  id="image"
                  onChange={handleChangeImage}
                  hidden
                />
                <label htmlFor="image" className="cursor-pointer">
                  {image ? (
                    <img
                      src={image}
                      className="w-full h-[250px] object-cover rounded-lg"
                      loading="lazy"
                      alt="Imagem do produto"
                    />
                  ) : (
                    <div className="w-full h-[250px] bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Nenhuma imagem</span>
                    </div>
                  )}
                </label>
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Nome do produto</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do produto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )
                }}
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
                      <Input
                        placeholder="Detalhes sobre o produto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DrawerFooter>
          <Button
            form="form-update"
            onClick={form.handleSubmit(handleUpdateProduct)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" />
            )}
            Atualizar produto
          </Button>
          <DrawerClose asChild>
            <Button variant="destructive">Excluir produto</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
