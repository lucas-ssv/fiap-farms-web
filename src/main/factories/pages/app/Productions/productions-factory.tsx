import { LoadProductsImpl } from '@/data/usecases/product'
import {
  RemoveProductionImpl,
  UpdateProductionImpl,
  WatchProductionsImpl,
} from '@/data/usecases/production'
import { AlertFirebaseRepository } from '@/infra/repositories/firebase/alert'
import { GoalFirebaseRepository } from '@/infra/repositories/firebase/goal'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { ProductionFirebaseRepository } from '@/infra/repositories/firebase/production'
import { Productions } from '@/presentation/pages/app/Productions'

export function MakeProductions() {
  const productionFirebaseRepository = new ProductionFirebaseRepository()
  const watchProductions = new WatchProductionsImpl(
    productionFirebaseRepository
  )
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  const goalFirebaseRepository = new GoalFirebaseRepository()
  const alertFirebaseRepository = new AlertFirebaseRepository()
  const updateProduction = new UpdateProductionImpl(
    productionFirebaseRepository,
    goalFirebaseRepository,
    goalFirebaseRepository,
    alertFirebaseRepository,
    productFirebaseRepository,
    productFirebaseRepository
  )
  const removeProduction = new RemoveProductionImpl(
    productionFirebaseRepository
  )
  return (
    <Productions
      watchProductions={watchProductions}
      loadProducts={loadProducts}
      updateProduction={updateProduction}
      removeProduction={removeProduction}
    />
  )
}
