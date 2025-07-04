import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'

import { categoryConverter } from './converters'
import { db } from '@/main/config/firebase'
import type {
  AddCategoryRepository,
  UpdateCategoryRepository,
} from '@/data/contracts/category'

export class CategoryFirebaseRepository
  implements AddCategoryRepository, UpdateCategoryRepository
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
}
