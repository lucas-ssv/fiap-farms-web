import type { AddProduct } from '@/domain/usecases/product'

export const mockAddProductParams = (): AddProduct.Params => {
  return {
    id: 'any_id',
    name: 'any_name',
    price: 100,
    cost: 50,
    categoryId: 'any_category_id',
    stock: 10,
    minStock: 5,
    maxStock: 20,
    unit: 'kg',
    description: 'any_description',
    image: 'any_image_url',
  }
}
