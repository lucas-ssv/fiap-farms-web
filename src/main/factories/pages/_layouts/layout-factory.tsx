import { LogoutImpl } from '@/data/usecases/account'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'
import { AppLayout } from '@/presentation/pages/_layouts'

export function MakeAppLayout() {
  const accountFirebaseRepository = new AccountFirebaseRepository()
  const logout = new LogoutImpl(accountFirebaseRepository)
  return <AppLayout logout={logout} />
}
