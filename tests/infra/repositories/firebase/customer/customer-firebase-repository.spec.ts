import { addDoc, collection } from 'firebase/firestore'

import { mockAddCustomerParams } from '@tests/data/usecases/customer/mocks'
import { CustomerFirebaseRepository } from '@/infra/repositories/firebase/customer'

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
  onSnapshot: jest.fn().mockImplementation((_, callback) => {
    callback({
      docs: [
        {
          id: 'any_category_id',
          data: () => ({
            id: 'any_category_id',
            name: 'any_category_name',
            description: 'any_category_description',
            image: 'any_category_image',
            createdAt: 'any_timestamp',
            updatedAt: 'any_timestamp',
          }),
        },
      ],
    })
    return jest.fn()
  }),
  doc: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    empty: false,
    forEach: (callback: any) => {
      callback({
        id: 'any_category_id',
        data: () => ({
          id: 1,
          name: 'John Doe',
          email: 'johndue@email.com',
          phone: '123-456-7890',
          postalCode: '12345',
          city: 'Springfield',
          state: 'IL',
          neighborhood: 'Downtown',
          address: '123 Main St',
          addressNumber: 101,
          addressComplement: 'Apt 4B',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      })
    },
  }),
  getFirestore: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

describe('CustomerFirebaseRepository', () => {
  describe('add()', () => {
    it('should add a customer on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const params = mockAddCustomerParams()
      const sut = new CustomerFirebaseRepository()

      await sut.add(params)

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        ...params,
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })
  })

  describe('loadAll()', () => {
    it('should load all categories on success', async () => {
      const sut = new CustomerFirebaseRepository()

      const categories = await sut.loadAll()

      expect(categories).toEqual([
        {
          id: 'any_category_id',
          name: 'John Doe',
          email: 'johndue@email.com',
          phone: '123-456-7890',
          postalCode: '12345',
          address: '123 Main St',
          addressNumber: 101,
          addressComplement: 'Apt 4B',
          neighborhood: 'Downtown',
          city: 'Springfield',
          state: 'IL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
    })
  })

  // describe('update()', () => {
  //   it('should update a category on success', async () => {
  //     const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
  //     const withConverterMock = jest
  //       .fn()
  //       .mockReturnValue(mockedCollectionWithConverter)
  //     ;(doc as jest.Mock).mockReturnValue({
  //       withConverter: withConverterMock,
  //     })
  //     const sut = new CategoryFirebaseRepository()
  //     const data = {
  //       image: 'any_image',
  //     }

  //     await sut.update('any_category_id', data)

  //     expect(updateDoc).toHaveBeenCalledWith(
  //       mockedCollectionWithConverter,
  //       data
  //     )
  //   })
  // })

  // describe('watchAll()', () => {
  //   it('should call onChange with all categories', async () => {
  //     const docMock = {
  //       id: 'any_category_id',
  //       data: () => ({
  //         name: 'any_name',
  //         description: 'any_description',
  //         image: 'any_image',
  //         createdAt: 'any_createdAt',
  //         updatedAt: 'any_updatedAt',
  //       }),
  //     }

  //     const querySnapshotMock = {
  //       forEach: (callback: (doc: any) => void) => {
  //         callback(docMock)
  //       },
  //     }

  //     const unsubscribeMock = jest.fn()

  //     ;(onSnapshot as jest.Mock).mockImplementation((_q, callback) => {
  //       callback(querySnapshotMock)
  //       return unsubscribeMock
  //     })

  //     const withConverterMock = jest
  //       .fn()
  //       .mockReturnValue('mockedCollectionWithConverter')
  //     ;(collection as jest.Mock).mockReturnValue({
  //       withConverter: withConverterMock,
  //     })
  //     ;(query as jest.Mock).mockReturnValue('mock_query')

  //     const onChangeMock = jest.fn()

  //     const sut = new CategoryFirebaseRepository()
  //     const unsubscribe = sut.watchAll(onChangeMock)

  //     expect(unsubscribe).toBe(unsubscribeMock)
  //     expect(onSnapshot).toHaveBeenCalled()
  //   })
  // })

  // describe('remove()', () => {
  //   it('should remove a category on success', async () => {
  //     const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
  //     const withConverterMock = jest
  //       .fn()
  //       .mockReturnValue(mockedCollectionWithConverter)
  //     ;(doc as jest.Mock).mockReturnValue({
  //       withConverter: withConverterMock,
  //     })
  //     const sut = new CategoryFirebaseRepository()

  //     await sut.remove('any_category_id')

  //     expect(deleteDoc).toHaveBeenCalledWith(mockedCollectionWithConverter)
  //   })
  // });
})
