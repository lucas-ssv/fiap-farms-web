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
    return 'any_user_uid'
  }
}

interface SaveUserRepository {
  save: (user: SaveUserRepository.Params) => Promise<void>
}

namespace SaveUserRepository {
  export type Params = {
    userUID: string
    name: string
    username: string
    email: string
  }
}

class SaveUserRepositoryMock implements SaveUserRepository {
  async save(user: SaveUserRepository.Params): Promise<void> {}
}

class AddAccountImpl implements AddAccount {
  constructor(
    private readonly addAccountRepository: AddAccountRepository,
    private readonly saveUserRepository: SaveUserRepository
  ) {}

  async execute(account: AddAccount.Params): Promise<void> {
    const userUID = await this.addAccountRepository.add(account)
    await this.saveUserRepository.save({
      userUID,
      name: account.name,
      username: account.username,
      email: account.email,
    })
  }
}

type SutTypes = {
  sut: AddAccountImpl
  addAccountRepositoryMock: AddAccountRepositoryMock
  saveUserRepositoryMock: SaveUserRepositoryMock
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryMock = new AddAccountRepositoryMock()
  const saveUserRepositoryMock = new SaveUserRepositoryMock()
  const sut = new AddAccountImpl(addAccountRepositoryMock, saveUserRepositoryMock)
  return {
    sut,
    addAccountRepositoryMock,
    saveUserRepositoryMock,
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

  it('should call SaveUserRepository with correct values', async () => {
    const { sut, saveUserRepositoryMock } = makeSut()
    const saveSpy = jest.spyOn(saveUserRepositoryMock, 'save')

    await sut.execute({
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(saveSpy).toHaveBeenCalledWith({
      userUID: 'any_user_uid',
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@mail.com',
    })
  })
})