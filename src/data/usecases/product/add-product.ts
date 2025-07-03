import type { AddProductRepository } from '@/data/contracts/product'
import type { UploadService } from '@/data/contracts/services'
import type { AddProduct } from '@/domain/usecases/product'

export class AddProductImpl implements AddProduct {
  private addProductRepository: AddProductRepository
  private uploadService: UploadService

  constructor(
    addProductRepository: AddProductRepository,
    uploadService: UploadService
  ) {
    this.addProductRepository = addProductRepository
    this.uploadService = uploadService
  }

  async execute(data: AddProduct.Params): Promise<void> {
    await this.addProductRepository.add(data)
    await this.uploadService.upload(data.image)
  }
}
