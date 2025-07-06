export interface LoadProducts {
  execute: () => Promise<LoadProducts.Result>
}

export namespace LoadProducts {
  export type Result = Array<{
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
  }>
}
