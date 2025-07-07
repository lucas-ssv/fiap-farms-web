import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'

import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { mockAddProductParams } from '@tests/data/usecases/product/mocks'

jest.useFakeTimers()

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
  updateDoc: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  getDoc: jest.fn().mockResolvedValue({
    exists: () => true,
    data: () => ({
      id: 'any_category_id',
      name: 'any_category_name',
      description: 'any_category_description',
      image: 'any_category_image',
      createdAt: 'any_timestamp',
      updatedAt: 'any_timestamp',
    }),
  }),
  getDocs: jest.fn().mockResolvedValue({
    docs: [
      {
        id: 'any_product_id',
        data: () => ({
          name: 'any_name',
          price: 100,
          cost: 50,
          categoryId: 'any_category_id',
          stock: 10,
          minStock: 5,
          maxStock: 20,
          unit: 'kg',
          description: 'any_description',
          image: 'any_image',
          createdAt: 'any_timestamp',
          updatedAt: 'any_timestamp',
        }),
      },
    ],
    empty: false,
  }),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

describe('ProductFirebaseRepository', () => {
  describe('add()', () => {
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

  describe('update()', () => {
    it('should update a product on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(doc as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new ProductFirebaseRepository()
      const data = {
        image: 'any_image',
      }

      await sut.update('any_product_id', data)

      expect(updateDoc).toHaveBeenCalledWith(
        mockedCollectionWithConverter,
        data
      )
    })
  })

  describe('loadAll()', () => {
    it('should load all products on success', async () => {
      const sut = new ProductFirebaseRepository()

      const products = await sut.loadAll()

      expect(products).toEqual([
        {
          id: 'any_product_id',
          name: 'any_name',
          price: 100,
          cost: 50,
          category: {
            id: 'any_category_id',
            name: 'any_category_name',
            description: 'any_category_description',
            image: 'any_category_image',
            createdAt: 'any_timestamp',
            updatedAt: 'any_timestamp',
          },
          stock: 10,
          minStock: 5,
          maxStock: 20,
          unit: 'kg',
          description: 'any_description',
          image: 'any_image',
          createdAt: 'any_timestamp',
          updatedAt: 'any_timestamp',
        },
      ])
    })
  })
})
