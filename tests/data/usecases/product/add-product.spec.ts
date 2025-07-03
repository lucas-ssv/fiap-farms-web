import { AddProductImpl } from '@/data/usecases/product'
import type { AddProduct } from '@/domain/usecases/product'
import { AddProductRepositoryMock } from '@tests/data/mocks/product'
import { mockAddProductParams } from './mocks'
import type { UploadService } from '@/data/contracts/services'

class UploadServiceMock implements UploadService {
  async upload(uri: string): Promise<UploadService.Result> {
    return {
      name: 'any_name',
      url: 'any_url',
    }
  }
}

type SutTypes = {
  sut: AddProduct
  addProductRepositoryMock: AddProductRepositoryMock
  uploadServiceMock: UploadServiceMock
}

const makeSut = (): SutTypes => {
  const addProductRepositoryMock = new AddProductRepositoryMock()
  const uploadServiceMock = new UploadServiceMock()
  const sut = new AddProductImpl(addProductRepositoryMock, uploadServiceMock)
  return {
    sut,
    addProductRepositoryMock,
    uploadServiceMock,
  }
}

describe('AddProduct usecase', () => {
  it('should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addProductRepositoryMock, 'add')
    const params = mockAddProductParams()

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith(params)
  })

  it('should call UploadService with correct values', async () => {
    const { sut, uploadServiceMock } = makeSut()
    const uploadSpy = jest.spyOn(uploadServiceMock, 'upload')
    const params = mockAddProductParams()

    await sut.execute(params)

    expect(uploadSpy).toHaveBeenCalledWith(params.image)
  })

  it('should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositoryMock } = makeSut()
    jest.spyOn(addProductRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute(mockAddProductParams())

    await expect(promise).rejects.toThrow()
  })
})
