import { LoadCategoriesImpl } from '@/data/usecases/category'
import { AddProductImpl } from '@/data/usecases/product'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { NewProduct } from '@/presentation/pages/app/Products'

export function MakeNewProduct() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const uploadService = new UploadFirebaseService()
  const addProduct = new AddProductImpl(
    productFirebaseRepository,
    uploadService,
    productFirebaseRepository
  )
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const loadCategories = new LoadCategoriesImpl(categoryFirebaseRepository)
  return <NewProduct addProduct={addProduct} loadCategories={loadCategories} />
}
