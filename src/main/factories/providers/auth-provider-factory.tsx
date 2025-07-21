import type { PropsWithChildren } from 'react'

import { AuthProvider } from '@/presentation/contexts'
import { ObserveAndLoadAccountByEmailImpl } from '@/data/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'

export function MakeAuthProvider({ children }: PropsWithChildren) {
  const accountFirebaseRepository = new AccountFirebaseRepository()
  const observeAndLoadAccountByEmail = new ObserveAndLoadAccountByEmailImpl(
    accountFirebaseRepository,
    accountFirebaseRepository
  )

  return (
    <AuthProvider observeAndLoadAccountByEmail={observeAndLoadAccountByEmail}>
      {children}
    </AuthProvider>
  )
}
