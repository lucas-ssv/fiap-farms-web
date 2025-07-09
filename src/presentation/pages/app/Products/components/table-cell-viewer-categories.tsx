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
  Input,
  Label,
} from '@/presentation/components/ui'

const schema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
})

export function TableCellViewerCategories({
  item,
}: {
  item: z.infer<typeof schema>
}) {
  const isMobile = useIsMobile()
  const [image, setImage] = React.useState<string | undefined>(item.image)

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
            <div>
              <Input type="file" id="image" onChange={() => {}} hidden />
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
              <Label htmlFor="name">Nome da categoria</Label>
              <Input
                id="name"
                defaultValue={item.name}
                placeholder="Digite o nome da categoria"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                defaultValue={item.description}
                placeholder="Digite a descrição da categoria"
              />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Atualizar categoria</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="destructive">Excluir categoria</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
