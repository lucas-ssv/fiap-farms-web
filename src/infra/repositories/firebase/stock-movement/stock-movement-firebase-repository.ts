import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/main/config/firebase'
import type { AddStockMovementRepository } from '@/data/contracts/stock-movement'
import { stockMovementConverter } from './converters'

export class StockMovementFirebaseRepository
  implements AddStockMovementRepository
{
  async add(params: AddStockMovementRepository.Params): Promise<void> {
    await addDoc(
      collection(db, 'stock-movements').withConverter(stockMovementConverter),
      {
        ...params,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
  }
}
