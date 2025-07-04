import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'

import { mockAddCategoryParams } from '@tests/data/usecases/category/mocks'
import { CategoryFirebaseRepository } from '@/infra/repositories/firebase/category'

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
  addDoc: jest.fn().mockResolvedValue({ id: 'any_category_id' }),
  collection: jest.fn(),
  query: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    empty: false,
    forEach: (callback: any) => {
      callback({
        id: 'any_category_id',
        data: () => ({
          id: '1',
          name: 'Fruits',
          description: 'Fresh fruits',
          image: 'fruit.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      })
      callback({
        id: 'any_category_id',
        data: () => ({
          id: '2',
          name: 'Vegetables',
          description: 'Organic vegetables',
          image: 'vegetable.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      })
    },
  }),
  getFirestore: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

describe('CategoryFirebaseRepository', () => {
  describe('add()', () => {
    it('should add a category on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const params = mockAddCategoryParams()
      const sut = new CategoryFirebaseRepository()

      await sut.add(params)

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        ...params,
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })

    it('should return a category id on success', async () => {
      const sut = new CategoryFirebaseRepository()

      const categoryId = await sut.add(mockAddCategoryParams())

      expect(categoryId).toBe('any_category_id')
    })
  })

  describe('update()', () => {
    it('should update a category on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(doc as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new CategoryFirebaseRepository()
      const data = {
        image: 'any_image',
      }

      await sut.update('any_category_id', data)

      expect(updateDoc).toHaveBeenCalledWith(
        mockedCollectionWithConverter,
        data
      )
    })
  })

  describe('loadAll()', () => {
    it('should load all categories on success', async () => {
      const sut = new CategoryFirebaseRepository()

      const categories = await sut.loadAll()

      expect(categories).toEqual([
        {
          id: 'any_category_id',
          name: 'Fruits',
          description: 'Fresh fruits',
          image: 'fruit.jpg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
        {
          id: 'any_category_id',
          name: 'Vegetables',
          description: 'Organic vegetables',
          image: 'vegetable.jpg',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })
  })
})
