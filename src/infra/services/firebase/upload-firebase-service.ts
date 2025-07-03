import type { UploadService } from '@/data/contracts/services'
import { storage } from '@/main/config/firebase'
import { ref } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export class UploadFirebaseService implements UploadService {
  async upload(uri: string): Promise<UploadService.Result> {
    const fileName = uuidv4()
    const storageRef = ref(storage, `products/${fileName}`)
    return Promise.resolve(null as any)
  }
}
