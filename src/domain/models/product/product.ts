export interface ProductModel {
  id: string
  name: string
  price: number
  cost: number
  categoryId: string
  stock: number
  minStock?: number
  maxStock?: number
  unit: string
  description?: string
  image?: string
  createdAt: Date
  updatedAt: Date
}
