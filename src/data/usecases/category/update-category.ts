import type { UpdateCategoryRepository } from '@/data/contracts/category'
import type { UpdateCategory } from '@/domain/usecases/category'

export class UpdateCategoryImpl implements UpdateCategory {
  private updateCategoryRepository: UpdateCategoryRepository

  constructor(updateCategoryRepository: UpdateCategoryRepository) {
    this.updateCategoryRepository = updateCategoryRepository
  }

  async execute(
    categoryId: string,
    data: UpdateCategory.Params
  ): Promise<void> {
    await this.updateCategoryRepository.update(categoryId, data)
  }
}
