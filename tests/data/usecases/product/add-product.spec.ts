import { AddProductImpl } from '@/data/usecases/product'
import type { AddProduct } from '@/domain/usecases/product'
import { AddProductRepositoryMock } from '@tests/data/mocks/product'

const mockAddProductParams: AddProduct.Params = {
  id: 'any_id',
  name: 'any_name',
  price: 100,
  cost: 50,
  categoryId: 'any_category_id',
  stock: 10,
  minStock: 5,
  maxStock: 20,
  unit: 'kg',
  description: 'any_description',
  image: 'any_image_url',
}

type SutTypes = {
  sut: AddProduct
  addProductRepositoryMock: AddProductRepositoryMock
}

const makeSut = (): SutTypes => {
  const addProductRepositoryMock = new AddProductRepositoryMock()
  const sut = new AddProductImpl(addProductRepositoryMock)
  return {
    sut,
    addProductRepositoryMock,
  }
}

describe('AddProduct usecase', () => {
  it('should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addProductRepositoryMock, 'add')

    await sut.execute(mockAddProductParams)

    expect(addSpy).toHaveBeenCalledWith(mockAddProductParams)
  })

  it('should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositoryMock } = makeSut()
    jest.spyOn(addProductRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute(mockAddProductParams)

    await expect(promise).rejects.toThrow()
  })
})
