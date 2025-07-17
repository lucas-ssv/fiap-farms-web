import { AddSaleImpl } from '@/data/usecases/sale'
import { LoadGoalsByUserIdRepositoryMock } from '@tests/data/mocks/goal'
import { AddSaleRepositoryMock } from '@tests/data/mocks/sale'
import { UpdateStockMovementRepositoryMock } from '@tests/data/mocks/stock-movement'
import { mockAddSaleParams } from '@tests/data/usecases/sale/mocks'

type SutTypes = {
  sut: AddSaleImpl
  addSaleRepositoryMock: AddSaleRepositoryMock
  updateStockMovementRepositoryMock: UpdateStockMovementRepositoryMock
  loadGoalsByUserIdRepositoryMock: LoadGoalsByUserIdRepositoryMock
}

const makeSut = (): SutTypes => {
  const addSaleRepositoryMock = new AddSaleRepositoryMock()
  const updateStockMovementRepositoryMock =
    new UpdateStockMovementRepositoryMock()
  const loadGoalsByUserIdRepositoryMock = new LoadGoalsByUserIdRepositoryMock()
  const sut = new AddSaleImpl(
    addSaleRepositoryMock,
    updateStockMovementRepositoryMock,
    loadGoalsByUserIdRepositoryMock
  )
  return {
    sut,
    addSaleRepositoryMock,
    updateStockMovementRepositoryMock,
    loadGoalsByUserIdRepositoryMock,
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

  it('should call UpdateStockMovementRepository with correct values', async () => {
    const { sut, updateStockMovementRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateStockMovementRepositoryMock, 'update')
    const params = mockAddSaleParams()

    await sut.execute(params)

    expect(updateSpy).toHaveBeenCalledWith(
      'output',
      params.productId,
      params.quantity
    )
  })

  it('should call LoadGoalsByUserIdRepository if there are goals with user id provided', async () => {
    const { sut, loadGoalsByUserIdRepositoryMock } = makeSut()
    const loadSpy = jest.spyOn(loadGoalsByUserIdRepositoryMock, 'loadAll')
    const params = mockAddSaleParams()

    await sut.execute(params)

    expect(loadSpy).toHaveBeenCalledWith(params.userId)
  })

  it('should throw if AddSaleRepository throws', async () => {
    const { sut, addSaleRepositoryMock } = makeSut()
    jest
      .spyOn(addSaleRepositoryMock, 'add')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute(mockAddSaleParams())

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('should throw if UpdateStockMovementRepository throws', async () => {
    const { sut, updateStockMovementRepositoryMock } = makeSut()
    jest
      .spyOn(updateStockMovementRepositoryMock, 'update')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute(mockAddSaleParams())

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  it('should throw if LoadGoalsByUserIdRepository throws', async () => {
    const { sut, loadGoalsByUserIdRepositoryMock } = makeSut()
    jest
      .spyOn(loadGoalsByUserIdRepositoryMock, 'loadAll')
      .mockRejectedValueOnce(new Error('any_error'))

    const promise = sut.execute(mockAddSaleParams())

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
