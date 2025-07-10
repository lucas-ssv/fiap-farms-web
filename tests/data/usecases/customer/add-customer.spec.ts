import { AddCustomerImpl } from '@/data/usecases/customer/add-customer'
import { AddCustomerRepositoryMock } from '@tests/data/mocks/customer'

describe('AddCustomer usecase', () => {
  it('should call AddCustomerRepository with correct values', async () => {
    const addCustomerRepositoryMock = new AddCustomerRepositoryMock()
    const addSpy = jest.spyOn(addCustomerRepositoryMock, 'add')
    const sut = new AddCustomerImpl(addCustomerRepositoryMock)
    const params = {
      name: 'John Doe',
      email: 'any_email@mail.com',
      phone: '123-456-7890',
      postalCode: '12345',
      city: 'Springfield',
      state: 'IL',
      neighborhood: 'Downtown',
      address: '123 Main St',
      addressNumber: '101',
      addressComplement: 'Apt 4B',
      loyaltyPoints: 100,
    }

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith(params)
  })
})
