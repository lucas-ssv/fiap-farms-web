import { LoadProductsImpl } from '@/data/usecases/product'
import { WatchSalesImpl } from '@/data/usecases/sale'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { SaleFirebaseRepository } from '@/infra/repositories/firebase/sale'
import { Sales } from '@/presentation/pages/app/Sales'

export function MakeSales() {
  const saleFirebaseRepository = new SaleFirebaseRepository()
  const watchSales = new WatchSalesImpl(saleFirebaseRepository)
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  return <Sales watchSales={watchSales} loadProducts={loadProducts} />
}
