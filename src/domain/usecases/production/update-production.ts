export interface UpdateProduction {
  execute: (
    productionId: string,
    data: UpdateProduction.Params
  ) => Promise<void>
}

export namespace UpdateProduction {
  export type Params = {
    productId?: string
    status?: 'in_production' | 'completed'
    quantity?: number
    quantityProduced?: number
    unit?: string
    startDate?: Date
    harvestDate?: Date
  }
}
