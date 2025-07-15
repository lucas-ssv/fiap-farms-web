import { LoadProductsImpl } from '@/data/usecases/product'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { NewProduction } from '@/presentation/pages/app/Productions'

export function MakeNewProduction() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  return <NewProduction loadProducts={loadProducts} />
}
