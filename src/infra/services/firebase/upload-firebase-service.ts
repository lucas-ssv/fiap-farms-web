import type { UploadService } from '@/data/contracts/services'
import { v4 as uuidv4 } from 'uuid'

export class UploadFirebaseService implements UploadService {
  async upload(uri: string): Promise<UploadService.Result> {
    uuidv4()
    return Promise.resolve(null as any)
  }
}
