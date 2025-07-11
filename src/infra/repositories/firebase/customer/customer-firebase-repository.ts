import type {
  AddCustomerRepository,
  LoadCustomersRepository,
} from '@/data/contracts/customer'
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
} from 'firebase/firestore'
import { customerConverter } from './converters'
import { db } from '@/main/config/firebase'

export class CustomerFirebaseRepository
  implements AddCustomerRepository, LoadCustomersRepository
{
  async add(params: AddCustomerRepository.Params): Promise<void> {
    await addDoc(collection(db, 'customers').withConverter(customerConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }

  async loadAll(): Promise<LoadCustomersRepository.Result> {
    const q = query(
      collection(db, 'customers').withConverter(customerConverter)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return []
    }

    const customers: LoadCustomersRepository.Result = []
    querySnapshot.forEach((doc) => {
      const customerId = doc.id
      const customer = doc.data()
      customers.push({
        id: customerId,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        addressNumber: customer.addressNumber,
        addressComplement: customer.addressComplement,
        postalCode: customer.postalCode,
        neighborhood: customer.neighborhood,
        city: customer.city,
        state: customer.state,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      })
    })
    return customers
  }
}
