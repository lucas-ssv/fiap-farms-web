import { AddCategoryImpl } from '@/data/usecases/category'
import { AddCategoryRepositoryMock } from '@tests/data/mocks/category'
import { UploadServiceMock } from '@tests/data/mocks/services'
import { mockAddCategoryParams } from './mocks'

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
    const data = mockAddCategoryParams()

    await sut.execute(data)

    expect(addSpy).toHaveBeenCalledWith({
      name: data.name,
      description: data.description,
    })
  })

  it('should call UploadService with correct values', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const data = mockAddCategoryParams()

    await sut.execute(data)

    expect(uploadSpy).toHaveBeenCalledWith(data.image)
  })

  it('should not call UploadService if image is not provided', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const data = mockAddCategoryParams()
    data.image = undefined

    await sut.execute(data)

    expect(uploadSpy).not.toHaveBeenCalled()
  })
})
