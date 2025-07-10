import type { AddSaleRepository } from '@/data/contracts/sale'
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export type Sale = AddSaleRepository.Params & {
  createdAt: Date
  updatedAt: Date
}

export const saleConverter: FirestoreDataConverter<Sale> = {
  toFirestore: (sale: Sale): DocumentData => {
    return {
      productId: sale.productId,
      customerId: sale.customerId,
      userId: sale.userId,
      quantity: sale.quantity,
      saleDate: sale.saleDate,
      totalPrice: sale.totalPrice,
      unitPrice: sale.unitPrice,
      discount: sale.discount ?? null,
      paymentMethod: sale.paymentMethod,
      status: sale.status,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): Sale => {
    const data = snapshot.data(options)
    return data as Sale
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
