import type { AddCustomerRepository } from '@/data/contracts/customer'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { customerConverter } from './converters'
import { db } from '@/main/config/firebase'

export class CustomerFirebaseRepository implements AddCustomerRepository {
  async add(params: AddCustomerRepository.Params): Promise<void> {
    await addDoc(collection(db, 'customers').withConverter(customerConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}
