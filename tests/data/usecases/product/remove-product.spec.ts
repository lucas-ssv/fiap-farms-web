import { RemoveProductImpl } from '@/data/usecases/product'
import { RemoveProductRepositoryMock } from '@tests/data/mocks/product'

describe('RemoveProduct usecase', () => {
  it('should call RemoveProductRepository with correct values', async () => {
    const removeProductRepositoryMock = new RemoveProductRepositoryMock()
    const removeSpy = jest.spyOn(removeProductRepositoryMock, 'remove')
    const sut = new RemoveProductImpl(removeProductRepositoryMock)

    await sut.execute('any_product_id')

    expect(removeSpy).toHaveBeenCalledWith('any_product_id')
  })
})
