import { WatchGoalsImpl } from '@/data/usecases/goal'
import { WatchProductsImpl } from '@/data/usecases/product'
import { WatchProductionsImpl } from '@/data/usecases/production'
import { WatchSalesImpl } from '@/data/usecases/sale'
import { GoalFirebaseRepository } from '@/infra/repositories/firebase/goal'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { ProductionFirebaseRepository } from '@/infra/repositories/firebase/production'
import { SaleFirebaseRepository } from '@/infra/repositories/firebase/sale'
import { Dashboard } from '@/presentation/pages/app'

export function MakeDashboard() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const watchProducts = new WatchProductsImpl(productFirebaseRepository)
  const saleFirebaseRepository = new SaleFirebaseRepository()
  const watchSales = new WatchSalesImpl(saleFirebaseRepository)
  const goalFirebaseRepository = new GoalFirebaseRepository()
  const watchGoals = new WatchGoalsImpl(goalFirebaseRepository)
  const productionFirebaseRepository = new ProductionFirebaseRepository()
  const watchProductions = new WatchProductionsImpl(
    productionFirebaseRepository
  )
  return (
    <Dashboard
      watchProducts={watchProducts}
      watchSales={watchSales}
      watchGoals={watchGoals}
      watchProductions={watchProductions}
    />
  )
}
