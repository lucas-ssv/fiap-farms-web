import { LoadCategoriesImpl } from '@/data/usecases/category'
import { AddProductImpl } from '@/data/usecases/product'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { StockMovementFirebaseRepository } from '@/infra/repositories/firebase/stock-movement'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { NewProduct } from '@/presentation/pages/app/Products'

export function MakeNewProduct() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const uploadService = new UploadFirebaseService()
  const stockMovementFirebaseRepository = new StockMovementFirebaseRepository()
  const addProduct = new AddProductImpl(
    productFirebaseRepository,
    uploadService,
    productFirebaseRepository,
    stockMovementFirebaseRepository
  )
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const loadCategories = new LoadCategoriesImpl(categoryFirebaseRepository)
  return <NewProduct addProduct={addProduct} loadCategories={loadCategories} />
}
