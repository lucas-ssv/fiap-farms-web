import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '@/main/config/firebase'
import { alertConverter } from './converters'
import type { AddAlertRepository } from '@/data/contracts/alert'

export class AlertFirebaseRepository implements AddAlertRepository {
  async add(params: AddAlertRepository.Params): Promise<void> {
    await addDoc(collection(db, 'alerts').withConverter(alertConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}
