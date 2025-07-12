import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
} from 'firebase/firestore'
import { loadSalesConverter, saleConverter } from './converters'
import { db } from '@/main/config/firebase'
import type {
  AddSaleRepository,
  WatchSalesRepository,
} from '@/data/contracts/sale'
import { loadProductsConverter } from '../product/converters'
import { loadCategoriesConverter } from '../category/converters'
import type { SaleModel } from '@/domain/models/sale'
import { loadCustomersConverter } from '../customer/converters'
import { userConverter } from '../account/converters'

export class SaleFirebaseRepository
  implements AddSaleRepository, WatchSalesRepository
{
  async add(params: AddSaleRepository.Params): Promise<void> {
    await addDoc(collection(db, 'sales').withConverter(saleConverter), {
      ...params,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
  }

  watchAll(onChange: WatchSalesRepository.Params): WatchSalesRepository.Result {
    const q = query(collection(db, 'sales').withConverter(loadSalesConverter))

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const sales: SaleModel[] = []

      for (const snapshot of querySnapshot.docs) {
        const sale = snapshot.data()
        const saleId = snapshot.id

        const productSnapshot = await getDoc(
          doc(db, 'products', sale.product.id).withConverter(
            loadProductsConverter
          )
        )
        const product = productSnapshot.data()

        const categorySnapshot = await getDoc(
          doc(db, 'categories', product!.id).withConverter(
            loadCategoriesConverter
          )
        )
        const category = categorySnapshot.data()

        const userSnapshot = await getDoc(
          doc(db, 'users', sale.user.id).withConverter(userConverter)
        )
        const user = userSnapshot.data()
        const userId = userSnapshot.id

        let customer: SaleModel['customer'] | undefined
        let customerId: string | undefined
        if (sale.customer) {
          const customerSnapshot = await getDoc(
            doc(db, 'customers', sale.customer.id).withConverter(
              loadCustomersConverter
            )
          )
          customer = customerSnapshot.data()
          customerId = customerSnapshot.id
        }

        sales.push({
          id: saleId,
          product: {
            ...product!,
            category: {
              ...category!,
            },
          },
          customer: sale.customer && {
            ...customer!,
          },
          user: {
            id: userId,
            ...user!,
          },
          quantity: sale.quantity,
          saleDate: sale.saleDate,
          totalPrice: sale.totalPrice,
          unitPrice: sale.unitPrice,
          unit: sale.unit,
          discount: sale.discount ?? 0,
          status: sale.status,
          paymentMethod: sale.paymentMethod,
          observations: sale.observations ?? '',
          createdAt: sale.createdAt,
          updatedAt: sale.updatedAt,
        })
      }

      onChange(sales)
    })

    return unsubscribe
  }
}
