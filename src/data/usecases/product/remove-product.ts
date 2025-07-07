import type { RemoveProductRepository } from '@/data/contracts/product'
import type { RemoveProduct } from '@/domain/usecases/product'

export class RemoveProductImpl implements RemoveProduct {
  private removeProductRepository: RemoveProductRepository

  constructor(removeProductRepository: RemoveProductRepository) {
    this.removeProductRepository = removeProductRepository
  }

  async execute(productId: string): Promise<void> {
    await this.removeProductRepository.remove(productId)
  }
}
