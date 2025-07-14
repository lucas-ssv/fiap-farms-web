import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { goalConverter } from './converters'
import { db } from '@/main/config/firebase'
import type { AddGoalRepository } from '@/data/contracts/goal'

export class GoalFirebaseRepository implements AddGoalRepository {
  async add(params: AddGoalRepository.Params): Promise<void> {
    await addDoc(collection(db, 'goals').withConverter(goalConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}
