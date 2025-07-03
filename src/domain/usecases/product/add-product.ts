export interface AddProduct {
  execute: (data: AddProduct.Params) => Promise<void>
}

export namespace AddProduct {
  export type Params = {
    name: string
    price: number
    cost: number
    categoryId: string
    stock: number
    minStock: number
    maxStock: number
    unit: string
    description: string
    image: string
  }
}
