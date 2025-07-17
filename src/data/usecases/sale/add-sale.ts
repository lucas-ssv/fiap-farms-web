import type { AddSaleRepository } from '@/data/contracts/sale'
import type { UpdateStockMovementRepository } from '@/data/contracts/stock-movement'
import type { AddSale } from '@/domain/usecases/sale'

export class AddSaleImpl implements AddSale {
  private addSaleRepository: AddSaleRepository
  private updateStockMovementRepository: UpdateStockMovementRepository

  constructor(
    addSaleRepository: AddSaleRepository,
    updateStockMovementRepository: UpdateStockMovementRepository
  ) {
    this.addSaleRepository = addSaleRepository
    this.updateStockMovementRepository = updateStockMovementRepository
  }

  async execute(params: AddSale.Params): Promise<void> {
    await this.addSaleRepository.add(params)
    await this.updateStockMovementRepository.update(
      'output',
      params.productId,
      params.quantity
    )
  }
}
