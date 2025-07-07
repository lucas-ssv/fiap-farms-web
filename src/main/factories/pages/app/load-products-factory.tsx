import { LoadCategoriesImpl } from '@/data/usecases/category'
import { LoadProductsImpl } from '@/data/usecases/product'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { Products } from '@/presentation/pages/app/Products'

export function MakeProducts() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const categoryFirebaseRepository = new CategoryFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  const loadCategories = new LoadCategoriesImpl(categoryFirebaseRepository)
  return (
    <Products loadProducts={loadProducts} loadCategories={loadCategories} />
  )
}
