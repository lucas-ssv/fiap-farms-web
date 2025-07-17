import type { UpdateProductionRepository } from '@/data/contracts/production'
import type { LoadStockMovementsByProductIdRepository } from '@/data/contracts/stock-movement/load-stock-movements-by-product-id-repository'
import type { UpdateProduction } from '@/domain/usecases/production'

export class UpdateProductionImpl implements UpdateProduction {
  private updateProductionRepository: UpdateProductionRepository
  private loadStockMovementsByProductIdRepository: LoadStockMovementsByProductIdRepository

  constructor(
    updateProductionRepository: UpdateProductionRepository,
    loadStockMovementsByProductIdRepository: LoadStockMovementsByProductIdRepository
  ) {
    this.updateProductionRepository = updateProductionRepository
    this.loadStockMovementsByProductIdRepository =
      loadStockMovementsByProductIdRepository
  }

  async execute(
    productionId: string,
    data: UpdateProduction.Params
  ): Promise<void> {
    await this.updateProductionRepository.update(productionId, data)
    await this.loadStockMovementsByProductIdRepository.loadAll(data.productId!)
  }
}
