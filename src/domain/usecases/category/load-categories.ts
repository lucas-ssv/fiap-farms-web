export interface LoadCategories {
  execute: () => Promise<LoadCategories.Result>
}

export namespace LoadCategories {
  export type Result = Array<{
    id: string
    name: string
    description?: string
    image?: string
    createdAt: Date
    updatedAt: Date
  }>
}
