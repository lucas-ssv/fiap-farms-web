import type { LoadCategories } from '@/domain/usecases/category'

export interface LoadCategoriesRepository {
  loadAll: () => Promise<LoadCategoriesRepository.Result>
}

export namespace LoadCategoriesRepository {
  export type Result = LoadCategories.Result
}
