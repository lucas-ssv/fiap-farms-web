import { AddCategoryImpl } from '@/data/usecases/category'
import { NewCategory } from '@/presentation/pages/app/Products'

export function MakeNewCategory() {
  const addCategory = new AddCategoryImpl()
  return <NewCategory addCategory={} />
}
