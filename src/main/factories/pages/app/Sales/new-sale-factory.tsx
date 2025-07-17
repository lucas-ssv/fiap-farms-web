import { LoadCustomersImpl } from '@/data/usecases/customer'
import { LoadProductsImpl } from '@/data/usecases/product'
import { AddSaleImpl } from '@/data/usecases/sale'
import { CustomerFirebaseRepository } from '@/infra/repositories/firebase/customer'
import { ProductFirebaseRepository } from '@/infra/repositories/firebase/product'
import { SaleFirebaseRepository } from '@/infra/repositories/firebase/sale'
import { StockMovementFirebaseRepository } from '@/infra/repositories/firebase/stock-movement'
import { NewSale } from '@/presentation/pages/app/Sales'

export function MakeNewSale() {
  const productFirebaseRepository = new ProductFirebaseRepository()
  const loadProducts = new LoadProductsImpl(productFirebaseRepository)
  const customerFirebaseRepository = new CustomerFirebaseRepository()
  const loadCustomers = new LoadCustomersImpl(customerFirebaseRepository)
  const saleFirebaseRepository = new SaleFirebaseRepository()
  const stockMovementFirebaseRepository = new StockMovementFirebaseRepository()
  const addSale = new AddSaleImpl(
    saleFirebaseRepository,
    stockMovementFirebaseRepository
  )
  return (
    <NewSale
      loadProducts={loadProducts}
      loadCustomers={loadCustomers}
      addSale={addSale}
    />
  )
}
