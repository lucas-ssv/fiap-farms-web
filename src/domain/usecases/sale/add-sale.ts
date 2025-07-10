export interface AddSale {
  execute: (params: AddSale.Params) => Promise<void>
}

export namespace AddSale {
  export type Params = {
    productId: string
    customerId?: string
    userId: string
    quantity: number
    saleDate: Date
    totalPrice: number
    unitPrice: number
    discount?: number
    paymentMethod: string
    status: 'pending' | 'completed' | 'cancelled'
  }
}
