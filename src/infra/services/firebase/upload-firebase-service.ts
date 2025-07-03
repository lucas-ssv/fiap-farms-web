import type { UploadService } from '@/data/contracts/services'
import { uriToBlob } from '@/infra/utils'
import { storage } from '@/main/config/firebase'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export class UploadFirebaseService implements UploadService {
  async upload(uri: string): Promise<UploadService.Result> {
    const fileName = uuidv4()
    const storageRef = ref(storage, `products/${fileName}`)
    const blob = await uriToBlob(uri)
    const uploadTask = uploadBytesResumable(storageRef, blob)
    return Promise.resolve(null as any)
  }
}
