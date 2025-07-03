import { AuthenticationImpl } from '@/data/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'
import { Login } from '@/presentation/pages/auth'

export function MakeLogin() {
  const loadAccountRepository = new AccountFirebaseRepository()
  const authentication = new AuthenticationImpl(loadAccountRepository)
  return <Login authentication={authentication} />
}
