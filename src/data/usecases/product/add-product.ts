import type { AddProductRepository } from '@/data/contracts/product'
import type { AddProduct } from '@/domain/usecases/product'

export class AddProductImpl implements AddProduct {
  private readonly addProductRepository: AddProductRepository

  constructor(addProductRepository: AddProductRepository) {
    this.addProductRepository = addProductRepository
  }

  async execute(data: AddProduct.Params): Promise<AddProduct.ProductId> {
    const productId = await this.addProductRepository.add(data)
    return productId
  }
}
