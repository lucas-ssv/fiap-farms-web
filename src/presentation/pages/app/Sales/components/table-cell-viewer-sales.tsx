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
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/presentation/components/ui'

const schema = z.object({
  id: z.string(),
  customer: z
    .object({
      id: z.string(),
      name: z.string(),
      email: z.email(),
      phone: z.string(),
      address: z.string(),
      loyaltyPoints: z.number(),
    })
    .optional(),
  product: z.string(),
  quantity: z.number(),
  price: z.string(),
  status: z.enum(['completed', 'pending', 'in progress', 'canceled']),
  paymentMethod: z.enum(['credit card', 'debit card', 'cash', 'pix']),
  date: z.iso.datetime(),
})

export function TableCellViewerSales({
  item,
}: {
  item: z.infer<typeof schema>
}) {
  const isMobile = useIsMobile()
  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.customer?.name || 'Cliente não informado'}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.product}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="customer">Cliente</Label>
              <Select defaultValue={item.customer?.id}>
                <SelectTrigger id="customers" className="w-full">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="c1">Categoria A</SelectItem>
                  <SelectItem value="Executive Summary">
                    Executive Summary
                  </SelectItem>
                  <SelectItem value="Technical Approach">
                    Technical Approach
                  </SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Capabilities">Capabilities</SelectItem>
                  <SelectItem value="Focus Documents">
                    Focus Documents
                  </SelectItem>
                  <SelectItem value="Narrative">Narrative</SelectItem>
                  <SelectItem value="Cover Page">Cover Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="product">Produto</Label>
              <Select defaultValue={item.product}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Category A">Categoria A</SelectItem>
                  <SelectItem value="Executive Summary">
                    Executive Summary
                  </SelectItem>
                  <SelectItem value="Technical Approach">
                    Technical Approach
                  </SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Capabilities">Capabilities</SelectItem>
                  <SelectItem value="Focus Documents">
                    Focus Documents
                  </SelectItem>
                  <SelectItem value="Narrative">Narrative</SelectItem>
                  <SelectItem value="Cover Page">Cover Page</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  type="number"
                  id="quantity"
                  defaultValue={item.quantity}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="price">Valor total</Label>
                <Input id="price" defaultValue={item.price} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.product}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Category A">Categoria A</SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="date">Data e hora</Label>
              <Input type="datetime-local" id="date" defaultValue={item.date} />
            </div>
          </form>
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
