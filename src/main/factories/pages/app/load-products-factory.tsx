import { LoadCategoriesImpl } from '@/data/usecases/category'
import { LoadProductsImpl, UpdateProductImpl } from '@/data/usecases/product'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { Products } from '@/presentation/pages/app/Products'

export function MakeProducts() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  const loadCategories = new LoadCategoriesImpl(categoryFirebaseRepository)
  const uploadService = new UploadFirebaseService()
  const updateProduct = new UpdateProductImpl(
    uploadService,
    productFirebaseRepository
  )
  return (
    <Products
      loadProducts={loadProducts}
      loadCategories={loadCategories}
      updateProduct={updateProduct}
    />
  )
}
