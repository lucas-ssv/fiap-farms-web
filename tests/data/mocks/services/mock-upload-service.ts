import type { UploadService } from '@/data/contracts/services'

export class UploadServiceMock implements UploadService {
  async upload(file: File): Promise<UploadService.Result> {
    return {
      name: 'any_name',
      url: 'any_url',
    }
  }
}
