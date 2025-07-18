import { WatchProductsImpl } from '@/data/usecases/product'
import { WatchSalesImpl } from '@/data/usecases/sale'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { SaleFirebaseRepository } from '@/infra/repositories/firebase/sale'
import { Dashboard } from '@/presentation/pages/app'

export function MakeDashboard() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const watchProducts = new WatchProductsImpl(productFirebaseRepository)
  const saleFirebaseRepository = new SaleFirebaseRepository()
  const watchSales = new WatchSalesImpl(saleFirebaseRepository)
  return <Dashboard watchProducts={watchProducts} watchSales={watchSales} />
}
