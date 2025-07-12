import {
  UpdateCustomerImpl,
  WatchCustomersImpl,
} from '@/data/usecases/customer'
import { CustomerFirebaseRepository } from '@/infra/repositories/firebase/customer'
import { Customers } from '@/presentation/pages/app/Sales'

export function MakeCustomers() {
  const customerFirebaseRepository = new CustomerFirebaseRepository()
  const watchCustomers = new WatchCustomersImpl(customerFirebaseRepository)
  const updateCustomer = new UpdateCustomerImpl(customerFirebaseRepository)
  return (
    <Customers
      watchCustomers={watchCustomers}
      updateCustomer={updateCustomer}
    />
  )
}
