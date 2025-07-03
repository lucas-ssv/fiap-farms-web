import type { UpdateProduct } from '@/domain/usecases/product'

interface UpdateProductRepository {
  update: (
    productId: string,
    data: UpdateProductRepository.Params
  ) => Promise<void>
}

namespace UpdateProductRepository {
  export type Params = UpdateProduct.Params
}

class UpdateProductRepositoryMock implements UpdateProductRepository {
  async update(
    productId: string,
    data: UpdateProductRepository.Params
  ): Promise<void> {}
}

class UpdateProductImpl implements UpdateProduct {
  private updateProductRepository: UpdateProductRepository

  constructor(updateProductRepository: UpdateProductRepository) {
    this.updateProductRepository = updateProductRepository
  }

  async execute(productId: string, data: UpdateProduct.Params): Promise<void> {
    await this.updateProductRepository.update(productId, data)
  }
}

describe('UpdateProduct usecase', () => {
  it('should call UpdateProductRepository with correct values', async () => {
    const updateProductRepositoryMock = new UpdateProductRepositoryMock()
    const updateSpy = jest.spyOn(updateProductRepositoryMock, 'update')
    const sut = new UpdateProductImpl(updateProductRepositoryMock)
    const params = {
      image: 'any_image',
    }

    await sut.execute('any_product_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_product_id', params)
  })
})
