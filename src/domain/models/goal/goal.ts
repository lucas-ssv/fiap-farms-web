import type { ProductModel } from '@/domain/models/product'

export interface GoalModel {
  id: string
  product: ProductModel
  description?: string
  type: 'sales' | 'production'
  status: 'in_progress' | 'done' | 'active' | 'inactive'
  targetValue: number
  currentValue: number
  startDate: Date
  deadline: Date
  createdAt: Date
  updatedAt: Date
}
