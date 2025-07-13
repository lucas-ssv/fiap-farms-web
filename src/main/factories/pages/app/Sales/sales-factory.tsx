import { LoadCustomersImpl } from '@/data/usecases/customer'
import { LoadProductsImpl } from '@/data/usecases/product'
import { WatchSalesImpl } from '@/data/usecases/sale'
import { CustomerFirebaseRepository } from '@/infra/repositories/firebase/customer'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { SaleFirebaseRepository } from '@/infra/repositories/firebase/sale'
import { Sales } from '@/presentation/pages/app/Sales'

export function MakeSales() {
  const saleFirebaseRepository = new SaleFirebaseRepository()
  const watchSales = new WatchSalesImpl(saleFirebaseRepository)
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  const customerFirebaseRepository = new CustomerFirebaseRepository()
  const loadCustomers = new LoadCustomersImpl(customerFirebaseRepository)
  return (
    <Sales
      watchSales={watchSales}
      loadProducts={loadProducts}
      loadCustomers={loadCustomers}
    />
  )
}
