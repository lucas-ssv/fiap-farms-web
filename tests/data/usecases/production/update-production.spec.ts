import { UpdateProductionImpl } from '@/data/usecases/production'
import type { UpdateProduction } from '@/domain/usecases/production'
import { UpdateProductionRepositoryMock } from '@tests/data/mocks/production'

type SutTypes = {
  sut: UpdateProduction
  updateProductionRepositoryMock: UpdateProductionRepositoryMock
}

const makeSut = (): SutTypes => {
  const updateProductionRepositoryMock = new UpdateProductionRepositoryMock()
  const sut = new UpdateProductionImpl(updateProductionRepositoryMock)
  return {
    sut,
    updateProductionRepositoryMock,
  }
}

describe('UpdateProduction usecase', () => {
  it('should call UpdateProductionRepository with correct values', async () => {
    const { sut, updateProductionRepositoryMock } = makeSut()
    const updateSpy = jest.spyOn(updateProductionRepositoryMock, 'update')
    const params: UpdateProduction.Params = {
      status: 'completed',
    }

    await sut.execute('any_production_id', params)

    expect(updateSpy).toHaveBeenCalledWith('any_production_id', {
      status: 'completed',
    })
  })

  it('should throw if UpdateProductionRepository throws', async () => {
    const { sut, updateProductionRepositoryMock } = makeSut()
    jest
      .spyOn(updateProductionRepositoryMock, 'update')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.execute('any_production_id', {
      status: 'completed',
    })

    await expect(promise).rejects.toThrow()
  })
})
