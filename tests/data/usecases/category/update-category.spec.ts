import { UpdateCategoryImpl } from '@/data/usecases/category'
import type { UpdateCategory } from '@/domain/usecases/category'
import { UpdateCategoryRepositoryMock } from '@tests/data/mocks/category'

type SutTypes = {
  sut: UpdateCategory
  updateCategoryRepositoryMock: UpdateCategoryRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateCategoryRepositoryMock = new UpdateCategoryRepositoryMock()
  const sut = new UpdateCategoryImpl(updateCategoryRepositoryMock)
  return {
    sut,
    updateCategoryRepositoryMock,
  }
}

describe('UpdateCategory usecase', () => {
  it('should call UpdateCategoryRepository with correct values', async () => {
    const { sut, updateCategoryRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateCategoryRepositoryMock, 'update')
    const params = {
      image: 'any_image',
    }

    await sut.execute('any_category_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_category_id', params)
  })

  it('should throw if UpdateCategoryRepository throws', async () => {
    const { sut, updateCategoryRepositoryMock } = makeSut()
    jest
      .spyOn(updateCategoryRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_category_id', {
      image: 'any_image',
    })

    await expect(promise).rejects.toThrow()
  })
})
