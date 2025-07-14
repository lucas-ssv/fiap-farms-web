import { LoadAccountsImpl } from '@/data/usecases/account'
import { LoadCustomersImpl } from '@/data/usecases/customer'
import { LoadProductsImpl } from '@/data/usecases/product'
import {
  RemoveSaleImpl,
  UpdateSaleImpl,
  WatchSalesImpl,
} from '@/data/usecases/sale'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'
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
  const accountFirebaseRepository = new AccountFirebaseRepository()
  const loadAccounts = new LoadAccountsImpl(accountFirebaseRepository)
  const updateSale = new UpdateSaleImpl(saleFirebaseRepository)
  const removeSale = new RemoveSaleImpl(saleFirebaseRepository)
  return (
    <Sales
      watchSales={watchSales}
      loadProducts={loadProducts}
      loadCustomers={loadCustomers}
      loadAccounts={loadAccounts}
      updateSale={updateSale}
      removeSale={removeSale}
    />
  )
}
