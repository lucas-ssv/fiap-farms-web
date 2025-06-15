import { AddAccountImpl } from '@/data/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase'
import { SignUp } from '@/presentation/pages/auth'

export function MakeSignUp() {
  const accountFirebaseRepository = new AccountFirebaseRepository()
  const addAccount = new AddAccountImpl(
    accountFirebaseRepository,
    accountFirebaseRepository
  )
  return <SignUp addAccount={addAccount} />
}
