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
  address: z.string(),
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
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" defaultValue={item.address} />
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
