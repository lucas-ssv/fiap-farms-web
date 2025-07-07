import { UpdateProductImpl } from '@/data/usecases/product'
import type { UpdateProduct } from '@/domain/usecases/product'
import { UpdateProductRepositoryMock } from '@tests/data/mocks/product'

type SutTypes = {
  sut: UpdateProduct
  updateProductRepositoryMock: UpdateProductRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateProductRepositoryMock = new UpdateProductRepositoryMock()
  const sut = new UpdateProductImpl(updateProductRepositoryMock)
  return {
    sut,
    updateProductRepositoryMock,
  }
}

describe('UpdateProduct usecase', () => {
  it('should call UpdateProductRepository with correct values', async () => {
    const { sut, updateProductRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateProductRepositoryMock, 'update')
    const params = {
      image: new File([''], 'any_image.png', { type: 'image/png' }),
    }

    await sut.execute('any_product_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_product_id', params)
  })

  it('should throw if UpdateProductRepository throws', async () => {
    const { sut, updateProductRepositoryMock } = makeSut()
    jest
      .spyOn(updateProductRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_product_id', {
      image: new File([''], 'any_image.png', { type: 'image/png' }),
    })

    await expect(promise).rejects.toThrow()
  })
})
