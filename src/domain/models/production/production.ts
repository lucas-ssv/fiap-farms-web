import type { ProductModel } from '@/domain/models/product'

export interface ProductionModel {
  id: string
  product: ProductModel
  status: 'in_production' | 'completed'
  quantityProduced: number
  unit: string
  startDate: Date
  harvestDate: Date
  createdAt: Date
  updatedAt: Date
}
