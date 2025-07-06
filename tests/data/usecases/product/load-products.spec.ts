import { LoadProductsImpl } from '@/data/usecases/product'
import { LoadProductsRepositoryStub } from '@tests/data/mocks/product'
import { mockProductsResult } from '@tests/data/mocks/product/mocks'

type SutTypes = {
  sut: LoadProductsImpl
  loadProductsRepositoryStub: LoadProductsRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadProductsRepositoryStub = new LoadProductsRepositoryStub()
  const sut = new LoadProductsImpl(loadProductsRepositoryStub)
  return {
    sut,
    loadProductsRepositoryStub,
  }
}

describe('LoadProducts usecase', () => {
  it('should call LoadProductsRepository with correct values', async () => {
    const { sut, loadProductsRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadProductsRepositoryStub, 'loadAll')

    await sut.execute()

    expect(loadAllSpy).toHaveBeenCalled()
  })

  it('should return a list of products on success', async () => {
    const { sut } = makeSut()

    const products = await sut.execute()

    expect(products).toEqual(mockProductsResult())
  })
})
