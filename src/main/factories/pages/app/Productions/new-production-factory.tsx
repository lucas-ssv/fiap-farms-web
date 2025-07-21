import { LoadProductsImpl } from '@/data/usecases/product'
import { AddProductionImpl } from '@/data/usecases/production'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { ProductionFirebaseRepository } from '@/infra/repositories/firebase/production'
import { NewProduction } from '@/presentation/pages/app/Productions'

export function MakeNewProduction() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  const productionFirebaseRepository = new ProductionFirebaseRepository()
  const addProduction = new AddProductionImpl(productionFirebaseRepository)
  return (
    <NewProduction loadProducts={loadProducts} addProduction={addProduction} />
  )
}
