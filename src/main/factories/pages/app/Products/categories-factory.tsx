import {
  RemoveCategoryImpl,
  UpdateCategoryImpl,
  WatchCategoriesImpl,
} from '@/data/usecases/category'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { Categories } from '@/presentation/pages/app/Products'

export function MakeCategories() {
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const watchCategories = new WatchCategoriesImpl(categoryFirebaseRepository)
  const uploadService = new UploadFirebaseService()
  const updateCategory = new UpdateCategoryImpl(
    categoryFirebaseRepository,
    uploadService
  )
  const removeCategory = new RemoveCategoryImpl(categoryFirebaseRepository)
  return (
    <Categories
      watchCategories={watchCategories}
      updateCategory={updateCategory}
      removeCategory={removeCategory}
    />
  )
}
