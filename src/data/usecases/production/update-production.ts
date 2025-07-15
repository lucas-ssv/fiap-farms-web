import type { UpdateProductionRepository } from '@/data/contracts/production'
import type { UpdateProduction } from '@/domain/usecases/production'

export class UpdateProductionImpl implements UpdateProduction {
  private updateProductionRepository: UpdateProductionRepository

  constructor(updateProductionRepository: UpdateProductionRepository) {
    this.updateProductionRepository = updateProductionRepository
  }

  async execute(
    productionId: string,
    data: UpdateProduction.Params
  ): Promise<void> {
    await this.updateProductionRepository.update(productionId, data)
  }
}
