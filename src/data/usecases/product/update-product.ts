import type { UpdateProductRepository } from '@/data/contracts/product'
import type { UpdateProduct } from '@/domain/usecases/product'

export class UpdateProductImpl implements UpdateProduct {
  private updateProductRepository: UpdateProductRepository

  constructor(updateProductRepository: UpdateProductRepository) {
    this.updateProductRepository = updateProductRepository
  }

  async execute(productId: string, data: UpdateProduct.Params): Promise<void> {
    await this.updateProductRepository.update(productId, data)
  }
}
