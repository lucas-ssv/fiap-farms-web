import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { db } from '@/main/config/firebase'
import type {
  AddStockMovementRepository,
  RemoveStockMovementRepository,
} from '@/data/contracts/stock-movement'
import { stockMovementConverter } from './converters'

export class StockMovementFirebaseRepository
  implements AddStockMovementRepository, RemoveStockMovementRepository
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

  async removeByProductId(productId: string): Promise<void> {
    const collectionRef = collection(db, 'stock-movements').withConverter(
      stockMovementConverter
    )
    const q = query(collectionRef, where('productId', '==', productId))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref)
    })
  }
}
