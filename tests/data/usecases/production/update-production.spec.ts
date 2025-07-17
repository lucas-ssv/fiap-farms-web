import { UpdateProductionImpl } from '@/data/usecases/production'
import type { UpdateProduction } from '@/domain/usecases/production'
import { UpdateProductionRepositoryMock } from '@tests/data/mocks/production'
import { LoadStockMovementsByProductIdRepositoryMock } from '@tests/data/mocks/stock-movement'

type SutTypes = {
  sut: UpdateProduction
  updateProductionRepositoryMock: UpdateProductionRepositoryMock
  loadStockMovementsByProductIdRepositoryMock: LoadStockMovementsByProductIdRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateProductionRepositoryMock = new UpdateProductionRepositoryMock()
  const loadStockMovementsByProductIdRepositoryMock =
    new LoadStockMovementsByProductIdRepositoryMock()
  const sut = new UpdateProductionImpl(
    updateProductionRepositoryMock,
    loadStockMovementsByProductIdRepositoryMock
  )
  return {
    sut,
    updateProductionRepositoryMock,
    loadStockMovementsByProductIdRepositoryMock,
  }
}

describe('UpdateProduction usecase', () => {
  it('should call UpdateProductionRepository with correct values', async () => {
    const { sut, updateProductionRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateProductionRepositoryMock, 'update')
    const params: UpdateProduction.Params = {
      status: 'in_production',
    }

    await sut.execute('any_production_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_production_id', {
      status: 'in_production',
    })
  })

  it('should call UpdateStockMovementRepository with correct values', async () => {
    const { sut, loadStockMovementsByProductIdRepositoryMock } = makeSut()
    const loadAllSpy = jest.spyOn(
      loadStockMovementsByProductIdRepositoryMock,
      'loadAll'
    )
    const params: UpdateProduction.Params = {
      productId: 'any_product_id',
      quantityProduced: 100,
    }

    await sut.execute('any_production_id', params)

    expect(loadAllSpy).toHaveBeenCalledWith('any_product_id')
  })

  it('should throw if UpdateProductionRepository throws', async () => {
    const { sut, updateProductionRepositoryMock } = makeSut()
    jest
      .spyOn(updateProductionRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_production_id', {
      status: 'in_production',
    })

    await expect(promise).rejects.toThrow()
  })

  it('should throw if LoadStockMovementsByProductIdRepository throws', async () => {
    const { sut, loadStockMovementsByProductIdRepositoryMock } = makeSut()
    jest
      .spyOn(loadStockMovementsByProductIdRepositoryMock, 'loadAll')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_production_id', {
      productId: 'any_product_id',
    })

    await expect(promise).rejects.toThrow()
  })
})
