import { AddCategoryImpl } from '@/data/usecases/category'
import { AddCategoryRepositoryMock } from '@tests/data/mocks/category'

type SutTypes = {
  sut: AddCategoryImpl
  addCategoryRepositoryMock: AddCategoryRepositoryMock
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryMock = new AddCategoryRepositoryMock()
  const sut = new AddCategoryImpl(addCategoryRepositoryMock)
  return {
    sut,
    addCategoryRepositoryMock,
  }
}

describe('AddCategory', () => {
  it('should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addCategoryRepositoryMock, 'add')
    const data = {
      name: 'any_name',
      description: 'any_description',
      image: new File([''], 'any_image.png', { type: 'image/png' }),
    }

    await sut.execute(data)

    expect(addSpy).toHaveBeenCalledWith({
      name: data.name,
      description: data.description,
    })
  })
})
