import { createUserWithEmailAndPassword } from "firebase/auth"

import { auth } from "@/main/config/firebase"
import type { AddAccountRepository } from "@/data/contracts/account"

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
    user: {
      uid: 'any_user_uid',
    },
  }),
  initializeAuth: jest.fn(),
}))

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}))

jest.mock('@/main/config/firebase', () => ({
  auth: 'mocked_auth',
}))

class AccountFirebaseRepository implements AddAccountRepository {
  async add(account: AddAccountRepository.Params): Promise<string> {
    const { email, password } = account
    await createUserWithEmailAndPassword(auth, email, password)
    return ''
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
  })
})