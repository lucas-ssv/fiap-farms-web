import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
} from 'firebase/firestore'
import { goalConverter } from './converters'
import { db } from '@/main/config/firebase'
import type {
  AddGoalRepository,
  WatchGoalsRepository,
} from '@/data/contracts/goal'
import { productConverter } from '../product/converters'
import type { GoalModel } from '@/domain/models/goal'
import { categoryConverter } from '../category/converters'

export class GoalFirebaseRepository
  implements AddGoalRepository, WatchGoalsRepository
{
  async add(params: AddGoalRepository.Params): Promise<void> {
    await addDoc(collection(db, 'goals').withConverter(goalConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }

  watchAll(onChange: WatchGoalsRepository.Params): WatchGoalsRepository.Result {
    const q = query(collection(db, 'goals').withConverter(goalConverter))

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const goals: GoalModel[] = []

      for (const snapshot of querySnapshot.docs) {
        const goal = snapshot.data()
        const goalId = snapshot.id

        const productSnapshot = await getDoc(
          doc(db, 'products', goal.productId).withConverter(productConverter)
        )

        const product = productSnapshot.data()
        const productId = productSnapshot.id

        const categorySnapshot = await getDoc(
          doc(db, 'categories', product!.categoryId).withConverter(
            categoryConverter
          )
        )
        const categoryId = categorySnapshot.id
        const category = categorySnapshot.data()

        goals.push({
          id: goalId,
          product: {
            id: productId,
            ...product!,
            image: product!.image as string | undefined,
            category: {
              id: categoryId,
              ...category!,
              image: category!.image as string | undefined,
            },
          },
          ...goal,
        })
      }

      onChange(goals)
    })

    return unsubscribe
  }
}
