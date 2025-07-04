import { AddProductImpl } from '@/data/usecases/product'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { UploadFirebaseService } from '@/infra/services/firebase'
import { NewProduct } from '@/presentation/pages/app/Products'

export function MakeNewProduct() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const uploadService = new UploadFirebaseService()
  const addProduct = new AddProductImpl(
    productFirebaseRepository,
    uploadService,
    productFirebaseRepository
  )
  return <NewProduct addProduct={addProduct} />
}
