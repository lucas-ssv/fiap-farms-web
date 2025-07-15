import { WatchGoalsImpl } from '@/data/usecases/goal'
import { GoalFirebaseRepository } from '@/infra/repositories/firebase/goal'
import { Goals } from '@/presentation/pages/app/Goals'

export function MakeGoals() {
  const goalFirebaseRepository = new GoalFirebaseRepository()
  const watchGoals = new WatchGoalsImpl(goalFirebaseRepository)
  return <Goals watchGoals={watchGoals} />
}
