import type { AddSaleRepository } from '@/data/contracts/sale'
import type { AddSale } from '@/domain/usecases/sale'

export class AddSaleImpl implements AddSale {
  private addSaleRepository: AddSaleRepository

  constructor(addSaleRepository: AddSaleRepository) {
    this.addSaleRepository = addSaleRepository
  }

  async execute(params: AddSale.Params): Promise<void> {
    await this.addSaleRepository.add(params)
  }
}
