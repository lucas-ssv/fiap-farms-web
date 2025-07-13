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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui'
import { InputDate } from '@/presentation/components'
import type { SaleModel } from '@/domain/models/sale'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MoneyInput from '@/presentation/components/money-input'
import type { LoadProducts } from '@/domain/usecases/product'
import React from 'react'
import { toast } from 'sonner'
import type { ProductModel } from '@/domain/models/product'

const schema = z.object({
  productId: z.string().optional(),
  customerId: z.string().optional(),
  userId: z.string().optional(),
  quantity: z.number().optional(),
  saleDate: z.string().optional(),
  totalPrice: z.number().optional(),
  unitPrice: z.number().optional(),
  discount: z.number().optional(),
  status: z.string().optional(),
  paymentMethod: z.string().optional(),
})

type UpdateSaleFormData = z.infer<typeof schema>

type Props = {
  item: SaleModel
  loadProducts: LoadProducts
}

export function TableCellViewerSales({ item, loadProducts }: Props) {
  const isMobile = useIsMobile()
  const form = useForm<UpdateSaleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: item.product.id,
      customerId: item.customer?.id,
      userId: item.user.id,
      quantity: item.quantity,
      saleDate: (item.saleDate as any).toDate(),
      totalPrice: item.totalPrice,
      unitPrice: item.unitPrice,
      discount: item.discount ?? 0,
      status: item.status,
      paymentMethod: item.paymentMethod,
    },
  })
  const [products, setProducts] = React.useState<ProductModel[]>([])

  const fetchProducts = React.useCallback(async () => {
    try {
      const products = await loadProducts.execute()
      setProducts(products)
    } catch (error) {
      toast.error('Erro ao carregar produtos. Tente novamente mais tarde.')
    }
  }, [loadProducts])

  React.useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.product.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.product.name}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form {...form}>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                      <FormLabel>Produto</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o produto" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                      <FormLabel>Cliente</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o cliente" />
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
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                      <FormLabel>Vendedor</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o vendedor" />
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
              </div>
              <div>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={() => (
                      <FormItem className="col-span-12 md:col-span-4">
                        <FormLabel>Quantidade</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="500"
                            {...form.register('quantity', {
                              valueAsNumber: true,
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <MoneyInput
                    form={form}
                    label="Valor total"
                    name="totalPrice"
                    placeholder="Valor total"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <MoneyInput
                    form={form}
                    label="Valor unitário"
                    name="unitPrice"
                    placeholder="Valor unitário"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="completed">Concluída</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="saleDate"
                  render={({ field }) => (
                    <FormItem className="col-span-12 md:col-span-6 xl:col-span-3">
                      <InputDate
                        value={field.value ? new Date(field.value) : undefined}
                        label="Data da venda"
                        onChange={(date) => {
                          field.onChange(date)
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Atualizar venda</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="destructive">Excluir venda</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
