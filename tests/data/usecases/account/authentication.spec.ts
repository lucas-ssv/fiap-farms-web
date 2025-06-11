import type { Authentication } from "@/domain/usecases/account"

interface LoadAccountRepository {
  auth: (params: LoadAccountRepository.Params) => Promise<void>
}

namespace LoadAccountRepository {
  export type Params = {
    email: string
    password: string
  }
}

class LoadAccountRepositoryMock implements LoadAccountRepository {
  async auth(params: LoadAccountRepository.Params): Promise<void> {}
}

class AuthenticationImpl implements Authentication {
  constructor(private readonly loadAccountRepository: LoadAccountRepository) {}

  async execute(params: Authentication.Params): Promise<void> {
    await this.loadAccountRepository.auth({
      email: params.email,
      password: params.password,
    })
  }
}

describe('Authentication Use Case', () => {
  it('should call LoadAccountRepository with correct values', async () => {
    const loadAccountRepositoryMock = new LoadAccountRepositoryMock()
    const authSpy = jest.spyOn(loadAccountRepositoryMock, 'auth')
    const sut = new AuthenticationImpl(loadAccountRepositoryMock)

    await sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })
})