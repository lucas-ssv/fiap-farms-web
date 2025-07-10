import { AddCustomerImpl } from '@/data/usecases/customer/add-customer'
import { AddCustomerRepositoryMock } from '@tests/data/mocks/customer'
import { mockAddCustomerParams } from '@tests/data/usecases/customer/mocks'

type SutTypes = {
  sut: AddCustomerImpl
  addCustomerRepositoryMock: AddCustomerRepositoryMock
}

const makeSut = (): SutTypes => {
  const addCustomerRepositoryMock = new AddCustomerRepositoryMock()
  const sut = new AddCustomerImpl(addCustomerRepositoryMock)
  return {
    sut,
    addCustomerRepositoryMock,
  }
}

describe('AddCustomer usecase', () => {
  it('should call AddCustomerRepository with correct values', async () => {
    const { sut, addCustomerRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addCustomerRepositoryMock, 'add')
    const params = mockAddCustomerParams()

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith(params)
  })
})
