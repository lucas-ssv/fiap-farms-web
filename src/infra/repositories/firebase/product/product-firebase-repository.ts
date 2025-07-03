import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'

import type {
  AddProductRepository,
  UpdateProductRepository,
} from '@/data/contracts/product'
import { productConverter } from './converters'
import { db } from '@/main/config/firebase'

export class ProductFirebaseRepository
  implements AddProductRepository, UpdateProductRepository
{
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

  async update(
    productId: string,
    data: UpdateProductRepository.Params
  ): Promise<void> {
    await updateDoc(
      doc(db, 'products', productId).withConverter(productConverter),
      data
    )
  }
}
