import { AddGoalImpl } from '@/data/usecases/goal'
import { LoadProductsImpl } from '@/data/usecases/product'
import { GoalFirebaseRepository } from '@/infra/repositories/firebase/goal'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { NewGoal } from '@/presentation/pages/app/Goals'

export function MakeNewGoal() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  const goalFirebaseRepository = new GoalFirebaseRepository()
  const addGoal = new AddGoalImpl(goalFirebaseRepository)
  return <NewGoal loadProducts={loadProducts} addGoal={addGoal} />
}
