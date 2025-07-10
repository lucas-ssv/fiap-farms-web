import { AddCustomerImpl } from '@/data/usecases/customer/add-customer'
import { CustomerFirebaseRepository } from '@/infra/repositories/firebase/customer'
import { NewCustomer } from '@/presentation/pages/app/Sales'

export function MakeNewCustomer() {
  const customerFirebaseRepository = new CustomerFirebaseRepository()
  const addCustomer = new AddCustomerImpl(customerFirebaseRepository)
  return <NewCustomer addCustomer={addCustomer} />
}
