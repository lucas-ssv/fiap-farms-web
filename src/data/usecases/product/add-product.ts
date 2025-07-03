import type { AddProductRepository } from '@/data/contracts/product'
import type { AddProduct } from '@/domain/usecases/product'

export class AddProductImpl implements AddProduct {
  private readonly addProductRepository: AddProductRepository

  constructor(addProductRepository: AddProductRepository) {
    this.addProductRepository = addProductRepository
  }

  async execute(data: AddProduct.Params): Promise<void> {
    await this.addProductRepository.add(data)
  }
}
