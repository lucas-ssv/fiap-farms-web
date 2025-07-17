import type { AddAlertRepository } from '@/data/contracts/alert'
import type {
  LoadGoalsByUserIdRepository,
  UpdateGoalRepository,
} from '@/data/contracts/goal'
import type { AddSaleRepository } from '@/data/contracts/sale'
import type { UpdateStockMovementRepository } from '@/data/contracts/stock-movement'
import type { AddSale } from '@/domain/usecases/sale'

export class AddSaleImpl implements AddSale {
  private addSaleRepository: AddSaleRepository
  private updateStockMovementRepository: UpdateStockMovementRepository
  private loadGoalsByUserIdRepository: LoadGoalsByUserIdRepository
  private updateGoalRepository: UpdateGoalRepository
  private addAlertRepository: AddAlertRepository

  constructor(
    addSaleRepository: AddSaleRepository,
    updateStockMovementRepository: UpdateStockMovementRepository,
    loadGoalsByUserIdRepository: LoadGoalsByUserIdRepository,
    updateGoalRepository: UpdateGoalRepository,
    addAlertRepository: AddAlertRepository
  ) {
    this.addSaleRepository = addSaleRepository
    this.updateStockMovementRepository = updateStockMovementRepository
    this.loadGoalsByUserIdRepository = loadGoalsByUserIdRepository
    this.updateGoalRepository = updateGoalRepository
    this.addAlertRepository = addAlertRepository
  }

  async execute(params: AddSale.Params): Promise<void> {
    await this.addSaleRepository.add(params)
    await this.updateStockMovementRepository.update(
      'output',
      params.productId,
      params.quantity
    )
    const goals = await this.loadGoalsByUserIdRepository.loadAll(params.userId)
    const goalsByProductId = goals.filter(
      (goal) => goal.product.id === params.productId && goal.type === 'sales'
    )

    for (const goal of goalsByProductId) {
      const newCurrentValue = goal.currentValue + params.quantity
      const goalAchieved = newCurrentValue >= goal.targetValue
      const updatedGoalData: UpdateGoalRepository.Params = {
        currentValue: newCurrentValue,
      }

      if (goalAchieved) {
        updatedGoalData.status = 'done'
      }

      await this.updateGoalRepository.update(goal.id, updatedGoalData)

      if (goalAchieved) {
        await this.addAlertRepository.add({
          userId: params.userId,
          productId: params.productId,
          type: 'sales',
          message: `Goal achieved for product ${params.productId}`,
          read: false,
        })
      }
    }
  }
}
