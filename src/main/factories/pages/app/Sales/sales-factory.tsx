import { WatchSalesImpl } from '@/data/usecases/sale'
import { SaleFirebaseRepository } from '@/infra/repositories/firebase/sale'
import { Sales } from '@/presentation/pages/app/Sales'

export function MakeSales() {
  const saleFirebaseRepository = new SaleFirebaseRepository()
  const watchSales = new WatchSalesImpl(saleFirebaseRepository)
  return <Sales watchSales={watchSales} />
}
