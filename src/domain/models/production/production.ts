export interface ProductionModel {
  id: string
  productId: string
  status: 'in_production' | 'completed'
  quantityProduced: number
  unit: string
  startDate: Date
  harvestDate: Date
  createdAt: Date
  updatedAt: Date
}
