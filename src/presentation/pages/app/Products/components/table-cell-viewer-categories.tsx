import React from 'react'
import { useIsMobile } from '@/presentation/hooks'
import { z } from 'zod/v4'
import {
  Button,
  Drawer,
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
} from '@/presentation/components/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CategoryModel } from '@/domain/models/category'
import type { RemoveCategory, UpdateCategory } from '@/domain/usecases/category'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
  image: z.file().optional().or(z.url('A imagem deve ser uma URL válida')),
})

type UpdateCategoryFormData = z.infer<typeof schema>

type Props = {
  item: CategoryModel
  updateCategory: UpdateCategory
  removeCategory: RemoveCategory
}

export function TableCellViewerCategories({
  item,
  updateCategory,
  removeCategory,
}: Props) {
  const isMobile = useIsMobile()
  const form = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item.name,
      description: item.description,
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

  const handleUpdateCategory = async () => {
    const data = form.getValues()

    try {
      await updateCategory.execute(item.id, data)
      toast.success('Categoria atualizada com sucesso!')
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error('Erro ao atualizar categoria. Tente novamente.')
    }
  }

  const handleRemoveCategory = async (categoryId: string) => {
    try {
      await removeCategory.execute(categoryId)
      toast.success('Categoria removida com sucesso!')
    } catch (error) {
      toast.error('Erro ao remover a categoria. Tente novamente.')
    }
  }

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
                      <FormLabel>Nome da categoria</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome da categoria"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-12 xl:col-span-6">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite a descrição da categoria"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <DrawerFooter>
          <Button
            form="form-update"
            onClick={form.handleSubmit(handleUpdateCategory)}
          >
            Atualizar categoria
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleRemoveCategory(item.id)}
          >
            Excluir categoria
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
