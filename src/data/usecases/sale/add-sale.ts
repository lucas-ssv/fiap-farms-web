import type { LoadGoalsByUserIdRepository } from '@/data/contracts/goal'
import type { AddSaleRepository } from '@/data/contracts/sale'
import type { UpdateStockMovementRepository } from '@/data/contracts/stock-movement'
import type { AddSale } from '@/domain/usecases/sale'

export class AddSaleImpl implements AddSale {
  private addSaleRepository: AddSaleRepository
  private updateStockMovementRepository: UpdateStockMovementRepository
  private loadGoalsByUserIdRepository: LoadGoalsByUserIdRepository

  constructor(
    addSaleRepository: AddSaleRepository,
    updateStockMovementRepository: UpdateStockMovementRepository,
    loadGoalsByUserIdRepository: LoadGoalsByUserIdRepository
  ) {
    this.addSaleRepository = addSaleRepository
    this.updateStockMovementRepository = updateStockMovementRepository
    this.loadGoalsByUserIdRepository = loadGoalsByUserIdRepository
  }

  async execute(params: AddSale.Params): Promise<void> {
    await this.addSaleRepository.add(params)
    await this.updateStockMovementRepository.update(
      'output',
      params.productId,
      params.quantity
    )
    await this.loadGoalsByUserIdRepository.loadAll(params.userId)
  }
}
