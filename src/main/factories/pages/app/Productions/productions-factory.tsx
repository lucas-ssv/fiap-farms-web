import { WatchProductionsImpl } from '@/data/usecases/production'
import { ProductionFirebaseRepository } from '@/infra/repositories/firebase/production'
import { Productions } from '@/presentation/pages/app/Productions'

export function MakeProductions() {
  const productionFirebaseRepository = new ProductionFirebaseRepository()
  const watchProductions = new WatchProductionsImpl(
    productionFirebaseRepository
  )
  return <Productions watchProductions={watchProductions} />
}
