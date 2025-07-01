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
} from '@/presentation/components/ui'

const schema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  postalCode: z.string(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.number(),
  complement: z.string().optional(),
  loyaltyPoints: z.number(),
})

export function TableCellViewerCustomers({
  item,
}: {
  item: z.infer<typeof schema>
}) {
  const isMobile = useIsMobile()

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
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" defaultValue={item.name} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" defaultValue={item.email} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="phone">Telefone / Celular</Label>
              <Input id="phone" defaultValue={item.phone} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="postalCode">CEP</Label>
              <Input id="postalCode" defaultValue={item.postalCode} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" defaultValue={item.city} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="state">Estado</Label>
              <Input id="state" defaultValue={item.state} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" defaultValue={item.neighborhood} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="street">Rua</Label>
              <Input id="street" defaultValue={item.street} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="number">Número</Label>
              <Input id="number" defaultValue={item.number} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" defaultValue={item.complement} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="loyaltyPoints">Pontos de lealdade</Label>
              <Input id="loyaltyPoints" defaultValue={item.loyaltyPoints} />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Atualizar cliente</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="destructive">Excluir cliente</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
