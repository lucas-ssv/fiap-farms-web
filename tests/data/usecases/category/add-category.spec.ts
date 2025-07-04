import { AddCategoryImpl } from '@/data/usecases/category'
import { AddCategoryRepositoryMock } from '@tests/data/mocks/category'
import { UploadServiceMock } from '@tests/data/mocks/services'

type SutTypes = {
  sut: AddCategoryImpl
  addCategoryRepositoryMock: AddCategoryRepositoryMock
  uploadServiceMock: UploadServiceMock
}

const makeSut = (): SutTypes => {
  const addCategoryRepositoryMock = new AddCategoryRepositoryMock()
  const uploadServiceMock = new UploadServiceMock()
  const sut = new AddCategoryImpl(addCategoryRepositoryMock, uploadServiceMock)
  return {
    sut,
    addCategoryRepositoryMock,
    uploadServiceMock,
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

  it('should call UploadService with correct values', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const data = {
      name: 'any_name',
      description: 'any_description',
      image: new File([''], 'any_image.png', { type: 'image/png' }),
    }

    await sut.execute(data)

    expect(uploadSpy).toHaveBeenCalledWith(data.image)
  })
})
