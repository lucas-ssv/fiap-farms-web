import type { AddCustomerRepository } from '@/data/contracts/customer'
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export type Customer = AddCustomerRepository.Params & {
  createdAt: Date
  updatedAt: Date
}

export const customerConverter: FirestoreDataConverter<Customer> = {
  toFirestore: (customer: Customer): DocumentData => {
    return {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      postalCode: customer.postalCode,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      neighborhood: customer.neighborhood,
      addressNumber: customer.addressNumber,
      addressComplement: customer.addressComplement,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): Customer => {
    const data = snapshot.data(options)
    return data as Customer
  },
}

// export const loadCategoriesConverter: FirestoreDataConverter<CategoryModel> = {
//   toFirestore: (category: CategoryModel): DocumentData => {
//     return {
//       id: category.id,
//       name: category.name,
//       description: category.description,
//       image: category.image ?? null,
//       createdAt: category.createdAt,
//       updatedAt: category.updatedAt,
//     }
//   },
//   fromFirestore: (snapshot, options): CategoryModel => {
//     const data = snapshot.data(options)
//     return data as CategoryModel
//   },
// }
