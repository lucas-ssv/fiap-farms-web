import { AddCategoryImpl } from '@/data/usecases/category'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { NewCategory } from '@/presentation/pages/app/Products'

export function MakeNewCategory() {
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const uploadService = new UploadFirebaseService()
  const addCategory = new AddCategoryImpl(
    categoryFirebaseRepository,
    uploadService,
    categoryFirebaseRepository
  )
  return <NewCategory addCategory={addCategory} />
}
