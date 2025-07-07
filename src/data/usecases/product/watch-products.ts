import type { WatchProductsRepository } from '@/data/contracts/product'
import type { WatchProducts } from '@/domain/usecases/product'

export class WatchProductsImpl implements WatchProducts {
  private watchProductsRepository: WatchProductsRepository

  constructor(watchProductsRepository: WatchProductsRepository) {
    this.watchProductsRepository = watchProductsRepository
  }

  async execute(onChange: WatchProducts.Params): Promise<WatchProducts.Result> {
    await this.watchProductsRepository.watchAll(onChange)
    return () => {}
  }
}
