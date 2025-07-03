import { addDoc, collection } from 'firebase/firestore'

import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { mockAddProductParams } from '@tests/data/usecases/product/mocks'

jest.mock('@/main/config/env', () => ({
  ENV: {
    APP_ID: 'any_app_id',
    PROJECT_ID: 'any_project_id',
    API_KEY: 'any_api_key',
    BUCKET_URL: 'any_bucket_url',
  },
}))

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn().mockResolvedValue({ id: 'any_product_id' }),
  collection: jest.fn(),
  getFirestore: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

describe('ProductFirebaseRepository', () => {
  it('should add a product on success', async () => {
    const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
    const withConverterMock = jest
      .fn()
      .mockReturnValue(mockedCollectionWithConverter)
    ;(collection as jest.Mock).mockReturnValue({
      withConverter: withConverterMock,
    })
    const params = mockAddProductParams()
    const sut = new ProductFirebaseRepository()

    await sut.add(params)

    expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
      ...params,
      createdAt: 'any_timestamp',
      updatedAt: 'any_timestamp',
    })
  })

  it('should return a product id on success', async () => {
    const sut = new ProductFirebaseRepository()

    const productId = await sut.add(mockAddProductParams())

    expect(productId).toBe('any_product_id')
  })
})
