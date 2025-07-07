import { RemoveProductImpl } from '@/data/usecases/product'
import { RemoveProductRepositoryMock } from '@tests/data/mocks/product'

type SutTypes = {
  sut: RemoveProductImpl
  removeProductRepositoryMock: RemoveProductRepositoryMock
}

const makeSut = (): SutTypes => {
  const removeProductRepositoryMock = new RemoveProductRepositoryMock()
  const sut = new RemoveProductImpl(removeProductRepositoryMock)
  return {
    sut,
    removeProductRepositoryMock,
  }
}

describe('RemoveProduct usecase', () => {
  it('should call RemoveProductRepository with correct values', async () => {
    const { sut, removeProductRepositoryMock } = makeSut()
    const removeSpy = jest.spyOn(removeProductRepositoryMock, 'remove')

    await sut.execute('any_product_id')

    expect(removeSpy).toHaveBeenCalledWith('any_product_id')
  })
})
