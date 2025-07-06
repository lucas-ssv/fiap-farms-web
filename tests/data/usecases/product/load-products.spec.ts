import { LoadProductsImpl } from '@/data/usecases/product'
import { LoadProductsRepositoryStub } from '@tests/data/mocks/product'

describe('LoadProducts usecase', () => {
  it('should call LoadProductsRepository with correct values', async () => {
    const loadProductsRepositoryStub = new LoadProductsRepositoryStub()
    const loadAllSpy = jest.spyOn(loadProductsRepositoryStub, 'loadAll')
    const sut = new LoadProductsImpl(loadProductsRepositoryStub)

    await sut.execute()

    expect(loadAllSpy).toHaveBeenCalled()
  })
})
