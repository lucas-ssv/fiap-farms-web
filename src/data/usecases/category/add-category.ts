import type { AddCategoryRepository } from '@/data/contracts/category'
import type { AddCategory } from '@/domain/usecases/category'

export class AddCategoryImpl implements AddCategory {
  private addCategoryRepository: AddCategoryRepository

  constructor(addCategoryRepository: AddCategoryRepository) {
    this.addCategoryRepository = addCategoryRepository
  }

  async execute(data: AddCategory.Params): Promise<void> {
    const { image, ...dataWithoutImage } = data
    await this.addCategoryRepository.add(dataWithoutImage)
  }
}
