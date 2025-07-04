import { AddCategoryImpl } from '@/data/usecases/category'
import { AddCategoryRepositoryMock } from '@tests/data/mocks/category'

describe('AddCategory', () => {
  it('should call AddCategoryRepository with correct values', async () => {
    const addCategoryRepositoryMock = new AddCategoryRepositoryMock()
    const addSpy = jest.spyOn(addCategoryRepositoryMock, 'add')
    const sut = new AddCategoryImpl(addCategoryRepositoryMock)
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
