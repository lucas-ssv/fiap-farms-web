import { WatchProductsImpl } from '@/data/usecases/product'
import { WatchProductsRepositoryStub } from '@tests/data/mocks/product'

describe('WatchProducts usecase', () => {
  it('should call WatchProductsRepository with correct values', async () => {
    const watchProductsRepositoryStub = new WatchProductsRepositoryStub()
    const watchAllSpy = jest.spyOn(watchProductsRepositoryStub, 'watchAll')
    const sut = new WatchProductsImpl(watchProductsRepositoryStub)
    const onChange = jest.fn()

    await sut.execute(onChange)

    expect(watchAllSpy).toHaveBeenCalledWith(onChange)
  })
})
