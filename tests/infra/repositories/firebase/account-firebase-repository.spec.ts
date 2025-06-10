import { createUserWithEmailAndPassword } from "firebase/auth"

import { auth, db } from "@/main/config/firebase"
import type { AddAccountRepository, SaveUserRepository } from "@/data/contracts/account"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { userConverter } from "@/infra/repositories/firebase/converters"

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: {
      uid: 'any_user_uid',
    },
  }),
  initializeAuth: jest.fn(),
}))

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn().mockResolvedValue({
    forEach: (callback: (doc: unknown) => void) => {
      callback({
        data: () => ({
          name: 'any_name',
          username: 'any_username',
          email: 'any_email@mail.com',
          userUID: 'any_user_uid',
          createdAt: 'any_timestamp',
          updatedAt: 'any_timestamp',
        }),
      })
    },
  }),
  collection: jest.fn(),
  getFirestore: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 'any_timestamp'),
  },
}))

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}))

jest.mock('@/main/config/firebase', () => ({
  auth: 'mocked_auth',
}))

class AccountFirebaseRepository implements AddAccountRepository, SaveUserRepository {
  async add(account: AddAccountRepository.Params): Promise<string> {
    const { email, password } = account
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user.uid
  }

  async save(user: SaveUserRepository.Params): Promise<void> {
    await addDoc(collection(db, 'users').withConverter(userConverter), {
      userUID: user.userUID,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }
}

const makeSut = (): AccountFirebaseRepository => {
  return new AccountFirebaseRepository()
}

describe('AccountFirebaseRepository', () => {
  describe('add()', () => {
    it('should add an account on success', async () => {
      const sut = makeSut()

      await sut.add({
        name: 'any_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password',
      })

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'any_email@mail.com',
        'any_password'
      )
    })

    it('should return an userUID on success', async () => {
      const sut = makeSut()

      const userUID = await sut.add({
        name: 'any_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        password: 'any_password',
      })

      expect(userUID).toBe('any_user_uid')
    })
  })

  describe('save()', () => {
    it('should save an user on success', async () => {
      const mockedCollectionWithConverter = 'mockedCollectionWithConverter'
      const withConverterMock = jest
        .fn()
        .mockReturnValue(mockedCollectionWithConverter)
      ;(collection as jest.Mock).mockReturnValue({
        withConverter: withConverterMock,
      })
      const sut = new AccountFirebaseRepository()

      await sut.save({
        userUID: 'any_user_uid',
        name: 'any_name',
        username: 'any_username',
        email: 'any_email@mail.com',
      })

      expect(addDoc).toHaveBeenCalledWith(mockedCollectionWithConverter, {
        userUID: 'any_user_uid',
        name: 'any_name',
        username: 'any_username',
        email: 'any_email@mail.com',
        createdAt: 'any_timestamp',
        updatedAt: 'any_timestamp',
      })
    })
  })
})