import { LoadProductsImpl } from '@/data/usecases/product'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { Products } from '@/presentation/pages/app/Products'

export function MakeProducts() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  return <Products loadProducts={loadProducts} />
}
