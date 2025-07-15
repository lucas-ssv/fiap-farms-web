import { WatchGoalsImpl } from '@/data/usecases/goal'
import { LoadProductsImpl } from '@/data/usecases/product'
import { GoalFirebaseRepository } from '@/infra/repositories/firebase/goal'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { Goals } from '@/presentation/pages/app/Goals'

export function MakeGoals() {
  const goalFirebaseRepository = new GoalFirebaseRepository()
  const watchGoals = new WatchGoalsImpl(goalFirebaseRepository)
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  return <Goals watchGoals={watchGoals} loadProducts={loadProducts} />
}
