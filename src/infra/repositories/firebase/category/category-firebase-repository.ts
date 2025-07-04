import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'

import { categoryConverter } from './converters'
import { db } from '@/main/config/firebase'
import type {
  AddCategoryRepository,
  LoadCategoriesRepository,
  UpdateCategoryRepository,
} from '@/data/contracts/category'

export class CategoryFirebaseRepository
  implements
    AddCategoryRepository,
    UpdateCategoryRepository,
    LoadCategoriesRepository
{
  async add(
    data: AddCategoryRepository.Params
  ): Promise<AddCategoryRepository.CategoryId> {
    const category = await addDoc(
      collection(db, 'categories').withConverter(categoryConverter),
      {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
    return category.id
  }

  async update(
    categoryId: string,
    data: UpdateCategoryRepository.Params
  ): Promise<void> {
    await updateDoc(
      doc(db, 'categories', categoryId).withConverter(categoryConverter),
      data
    )
  }

  async loadAll(): Promise<LoadCategoriesRepository.Result> {
    const q = query(
      collection(db, 'categories').withConverter(categoryConverter)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return []
    }

    const categories: LoadCategoriesRepository.Result = []
    querySnapshot.forEach((doc) => {
      const categoryId = doc.id
      const category = doc.data()
      categories.push({
        id: categoryId,
        name: category.name,
        description: category.description,
        image: category.image as string | undefined,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      })
    })
    return categories
  }
}
