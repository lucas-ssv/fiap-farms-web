import type { AddProductRepository } from '@/data/contracts/product'
import { productConverter } from '@/infra/repositories/firebase/product/converters'
import { db } from '@/main/config/firebase'
import { mockAddProductParams } from '@tests/data/usecases/product/mocks'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

jest.mock('@/main/config/env', () => ({
  ENV: {
    APP_ID: 'any_app_id',
    PROJECT_ID: 'any_project_id',
    API_KEY: 'any_api_key',
    BUCKET_URL: 'any_bucket_url',
  },
}))

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  getFirestore: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

class ProductFirebaseRepository implements AddProductRepository {
  async add(data: AddProductRepository.Params): Promise<void> {
    await addDoc(collection(db, 'products').withConverter(productConverter), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}

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
})
