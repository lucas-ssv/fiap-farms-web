import type { AddCategoryRepository } from '@/data/contracts/category'
import type { UploadService } from '@/data/contracts/services'
import type { AddCategory } from '@/domain/usecases/category'

export class AddCategoryImpl implements AddCategory {
  private addCategoryRepository: AddCategoryRepository
  private uploadService: UploadService

  constructor(
    addCategoryRepository: AddCategoryRepository,
    uploadService: UploadService
  ) {
    this.addCategoryRepository = addCategoryRepository
    this.uploadService = uploadService
  }

  async execute(data: AddCategory.Params): Promise<void> {
    const { image, ...dataWithoutImage } = data
    await this.addCategoryRepository.add(dataWithoutImage)
    await this.uploadService.upload(image!)
  }
}
