import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { saleConverter } from './converters'
import { db } from '@/main/config/firebase'
import type { AddSaleRepository } from '@/data/contracts/sale'

export class SaleFirebaseRepository implements AddSaleRepository {
  async add(params: AddSaleRepository.Params): Promise<void> {
    await addDoc(collection(db, 'sales').withConverter(saleConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}
