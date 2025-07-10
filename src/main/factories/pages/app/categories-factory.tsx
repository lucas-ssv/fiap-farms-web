import {
  UpdateCategoryImpl,
  WatchCategoriesImpl,
} from '@/data/usecases/category'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { Categories } from '@/presentation/pages/app/Products'

export function MakeCategories() {
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const watchCategories = new WatchCategoriesImpl(categoryFirebaseRepository)
  const updateCategory = new UpdateCategoryImpl(categoryFirebaseRepository)
  return (
    <Categories
      watchCategories={watchCategories}
      updateCategory={updateCategory}
    />
  )
}
