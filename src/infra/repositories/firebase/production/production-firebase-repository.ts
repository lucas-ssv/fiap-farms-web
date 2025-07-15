import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/main/config/firebase'
import type { AddProductionRepository } from '@/data/contracts/production'
import { productionConverter } from './converters'

export class ProductionFirebaseRepository implements AddProductionRepository {
  async add(params: AddProductionRepository.Params): Promise<void> {
    await addDoc(
      collection(db, 'productions').withConverter(productionConverter),
      {
        ...params,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
  }
}
