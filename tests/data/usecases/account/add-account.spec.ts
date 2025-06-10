import type { AddAccount } from "@/domain/usecases/account"

interface AddAccountRepository {
  add: (account: AddAccountRepository.Params) => Promise<string>
}

namespace AddAccountRepository {
  export type Params = {
    name: string
    username: string
    email: string
    password: string
  }
}

class AddAccountRepositoryMock implements AddAccountRepository {
  async add(account: AddAccountRepository.Params): Promise<string> {
    return 'any_id'
  }
}

class AddAccountImpl implements AddAccount {
  constructor(private readonly addAccountRepository: AddAccountRepository) {}

  async execute(account: AddAccount.Params): Promise<void> {
    await this.addAccountRepository.add(account)
  }
}

describe('AddAccount Use Case', () => {
  it('should call AddAccountRepository with correct values', async () => {
    const addAccountRepositoryMock = new AddAccountRepositoryMock()
    const addSpy = jest.spyOn(addAccountRepositoryMock, 'add')
    const sut = new AddAccountImpl(addAccountRepositoryMock)

    await sut.execute({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })
})