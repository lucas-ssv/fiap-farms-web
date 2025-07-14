import { AddSaleImpl } from '@/data/usecases/sale'
import { AddSaleRepositoryMock } from '@tests/data/mocks/sale'
import { mockAddSaleParams } from '@tests/data/usecases/sale/mocks'

type SutTypes = {
  sut: AddSaleImpl
  addSaleRepositoryMock: AddSaleRepositoryMock
}

const makeSut = (): SutTypes => {
  const addSaleRepositoryMock = new AddSaleRepositoryMock()
  const sut = new AddSaleImpl(addSaleRepositoryMock)
  return {
    sut,
    addSaleRepositoryMock,
  }
}

describe('AddSale usecase', () => {
  it('should call AddSaleRepository with correct values', async () => {
    const { sut, addSaleRepositoryMock } = makeSut()
    const addSpy = jest.spyOn(addSaleRepositoryMock, 'add')
    const params = mockAddSaleParams()

    await sut.execute(params)

    expect(addSpy).toHaveBeenCalledWith(params)
  })

  it('should throw if AddSaleRepository throws', async () => {
    const { sut, addSaleRepositoryMock } = makeSut()
    jest
      .spyOn(addSaleRepositoryMock, 'add')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute(mockAddSaleParams())

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
