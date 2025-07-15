export interface AddProduction {
  execute: (data: AddProduction.Params) => Promise<void>
}

export namespace AddProduction {
  export type Params = {
    productId: string
    status: 'in_production' | 'completed'
    quantity: number
    quantityProduced: number
    unit: string
    startDate: Date
    harvestDate: Date
  }
}
