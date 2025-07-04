import type { AddCategoryRepository } from '@/data/contracts/category'
import type { DocumentData, FirestoreDataConverter } from 'firebase/firestore'

export type Category = AddCategoryRepository.Params & {
  createdAt: Date
  updatedAt: Date
}

export const categoryConverter: FirestoreDataConverter<Category> = {
  toFirestore: (category: Category): DocumentData => {
    return {
      name: category.name,
      description: category.description,
      image: category.image ?? null,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  },
  fromFirestore: (snapshot, options): Category => {
    const data = snapshot.data(options)
    return data as Category
  },
}
