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
})

type UpdateProductFormData = z.infer<typeof schema>

export function TableCellViewerProducts({ item }: { item: ProductModel }) {
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
    },
  })

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
          <img
            src={item.image}
            className="w-full h-1/3 object-cover rounded-lg"
            loading="lazy"
            alt="Imagem do produto"
          />
          <Form {...form}>
            <form className="flex flex-col gap-4">
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
                        <SelectItem value="kg">KG</SelectItem>
                        <SelectItem value="unit">Unidade</SelectItem>
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
          <DrawerClose asChild>
            <Button>Atualizar produto</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="destructive">Excluir produto</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
