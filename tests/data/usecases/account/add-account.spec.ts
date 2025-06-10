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

type SutTypes = {
  sut: AddAccountImpl
  addAccountRepositoryMock: AddAccountRepositoryMock
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryMock = new AddAccountRepositoryMock()
  const sut = new AddAccountImpl(addAccountRepositoryMock)
  return {
    sut,
    addAccountRepositoryMock
  }
}

describe('AddAccount Use Case', () => {
  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryMock, 'add')

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

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryMock } = makeSut()
    jest.spyOn(addAccountRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.execute({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    await expect(promise).rejects.toThrow()
  })
})