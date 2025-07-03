import { addDoc, collection, Timestamp } from 'firebase/firestore'

import type { AddProductRepository } from '@/data/contracts/product'
import { productConverter } from './converters'
import { db } from '@/main/config/firebase'

export class ProductFirebaseRepository implements AddProductRepository {
  async add(
    data: AddProductRepository.Params
  ): Promise<AddProductRepository.ProductId> {
    const product = await addDoc(
      collection(db, 'products').withConverter(productConverter),
      {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
    return product.id
  }
}
