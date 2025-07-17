import type { AddAlertRepository } from '@/data/contracts/alert'
import type {
  LoadGoalsByUserIdRepository,
  UpdateGoalRepository,
} from '@/data/contracts/goal'
import type { UpdateProductionRepository } from '@/data/contracts/production'
import type { UpdateProduction } from '@/domain/usecases/production'

export class UpdateProductionImpl implements UpdateProduction {
  private updateProductionRepository: UpdateProductionRepository
  private loadGoalsByUserIdRepository: LoadGoalsByUserIdRepository
  private updateGoalRepository: UpdateGoalRepository
  private addAlertRepository: AddAlertRepository

  constructor(
    updateProductionRepository: UpdateProductionRepository,
    loadGoalsByUserIdRepository: LoadGoalsByUserIdRepository,
    updateGoalRepository: UpdateGoalRepository,
    addAlertRepository: AddAlertRepository
  ) {
    this.updateProductionRepository = updateProductionRepository
    this.loadGoalsByUserIdRepository = loadGoalsByUserIdRepository
    this.updateGoalRepository = updateGoalRepository
    this.addAlertRepository = addAlertRepository
  }

  async execute(
    productionId: string,
    data: UpdateProduction.Params
  ): Promise<void> {
    await this.updateProductionRepository.update(productionId, data)
    const goals = await this.loadGoalsByUserIdRepository.loadAll(data.userId!)
    const goalsByProductId = goals.filter(
      (goal) => goal.product.id === data.productId && goal.type === 'production'
    )

    for (const goal of goalsByProductId) {
      const quantityProduced = data.quantityProduced! - data.lastQuantity!
      const newCurrentValue = goal.currentValue + quantityProduced
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
          userId: data.userId!,
          productId: data.productId!,
          type: 'production',
          message: `Goal achieved for product ${data.productId!}`,
          read: false,
        })
      }
    }
  }
}
