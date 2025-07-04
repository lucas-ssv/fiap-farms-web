import type { UploadService } from '@/data/contracts/services'
import { storage } from '@/main/config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export class UploadFirebaseService implements UploadService {
  async upload(file: File): Promise<UploadService.Result> {
    const fileName = uuidv4()
    const storageRef = ref(storage, `products/${fileName}`)
    const blob = new Blob([file], { type: file.type })
    const snapshot = await uploadBytes(storageRef, blob)
    const downloadUrl = await getDownloadURL(snapshot.ref)
    return {
      name: fileName,
      url: downloadUrl,
    }
  }
}
