import type { AddProductRepository } from '@/data/contracts/product'
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export type Product = AddProductRepository.Params & {
  createdAt: Date
  updatedAt: Date
}

export const productConverter: FirestoreDataConverter<Product> = {
  toFirestore: (product: Product): DocumentData => {
    return {
      name: product.name,
      price: product.price,
      cost: product.cost,
      categoryId: product.categoryId,
      stock: product.stock,
      minStock: product.minStock,
      maxStock: product.maxStock,
      unit: product.unit,
      description: product.description,
      image: product.image ?? null,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): Product => {
    const data = snapshot.data(options)
    return data as Product
  },
}
