import { LoadCategoriesImpl } from '@/data/usecases/category'
import { LoadCategoriesRepositoryStub } from '@tests/data/mocks/category'

describe('LoadCategories usecase', () => {
  it('should call LoadCategoriesRepository', async () => {
    const loadCategoriesRepositoryStub = new LoadCategoriesRepositoryStub()
    const loadAllSpy = jest.spyOn(loadCategoriesRepositoryStub, 'loadAll')
    const sut = new LoadCategoriesImpl(loadCategoriesRepositoryStub)

    await sut.execute()

    expect(loadAllSpy).toHaveBeenCalled()
  })
})
