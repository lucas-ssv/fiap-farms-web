import type {
  AddProductRepository,
  UpdateProductRepository,
} from '@/data/contracts/product'
import type { UploadService } from '@/data/contracts/services'
import type { AddProduct } from '@/domain/usecases/product'

export class AddProductImpl implements AddProduct {
  private addProductRepository: AddProductRepository
  private uploadService: UploadService
  private updateProductRepository: UpdateProductRepository

  constructor(
    addProductRepository: AddProductRepository,
    uploadService: UploadService,
    updateProductRepository: UpdateProductRepository
  ) {
    this.addProductRepository = addProductRepository
    this.uploadService = uploadService
    this.updateProductRepository = updateProductRepository
  }

  async execute(data: AddProduct.Params): Promise<void> {
    const productId = await this.addProductRepository.add(data)
    const { url } = await this.uploadService.upload(data.image)
    await this.updateProductRepository.update(productId, {
      image: url,
    })
  }
}
