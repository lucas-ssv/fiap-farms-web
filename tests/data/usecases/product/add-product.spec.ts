import type { AddProduct } from '@/domain/usecases/product'

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

interface AddProductRepository {
  add: (data: AddProductRepository.Params) => Promise<void>
}

namespace AddProductRepository {
  export type Params = AddProduct.Params
}

class AddProductRepositoryMock implements AddProductRepository {
  async add(data: AddProductRepository.Params): Promise<void> {}
}

class AddProductImpl implements AddProduct {
  private readonly addProductRepository: AddProductRepository

  constructor(addProductRepository: AddProductRepository) {
    this.addProductRepository = addProductRepository
  }

  async execute(data: AddProduct.Params): Promise<void> {
    await this.addProductRepository.add(data)
  }
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
})
