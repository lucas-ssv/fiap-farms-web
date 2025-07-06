import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'

import type {
  AddProductRepository,
  LoadProductsRepository,
  UpdateProductRepository,
} from '@/data/contracts/product'
import { productConverter } from './converters'
import { db } from '@/main/config/firebase'

export class ProductFirebaseRepository
  implements
    AddProductRepository,
    UpdateProductRepository,
    LoadProductsRepository
{
  async add(
    data: AddProductRepository.Params
  ): Promise<AddProductRepository.ProductId> {
    const product = await addDoc(
      collection(db, 'products').withConverter(productConverter),
      {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
    )
    return product.id
  }

  async update(
    productId: string,
    data: UpdateProductRepository.Params
  ): Promise<void> {
    await updateDoc(
      doc(db, 'products', productId).withConverter(productConverter),
      data
    )
  }

  async loadAll(): Promise<LoadProductsRepository.Result> {
    const q = query(
      collection(db, 'categories').withConverter(productConverter)
    )
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return []
    }

    const products: LoadProductsRepository.Result = []
    querySnapshot.forEach((doc) => {
      const productId = doc.id
      const product = doc.data()
      products.push({
        id: productId,
        name: product.name,
        description: product.description,
        price: product.price,
        cost: product.cost,
        categoryId: product.categoryId,
        stock: product.stock,
        minStock: product.minStock,
        maxStock: product.maxStock,
        unit: product.unit,
        image: product.image as string | undefined,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })
    })
    return products
  }
}
