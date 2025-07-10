import { AddSaleImpl } from '@/data/usecases/sale'
import { AddSaleRepositoryMock } from '@tests/data/mocks/sale'
import { mockAddSaleParams } from '@tests/data/mocks/sale/mocks'

describe('AddSale usecase', () => {
  it('should call AddSaleRepository with correct values', async () => {
    const addSaleRepositoryMock = new AddSaleRepositoryMock()
    const addSpy = jest.spyOn(addSaleRepositoryMock, 'add')
    const sut = new AddSaleImpl(addSaleRepositoryMock)
    const params = mockAddSaleParams()

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith(params)
  })
})
