import { LogoutImpl } from '@/data/usecases/account'
import { UpdateAlertImpl, WatchAlertsImpl } from '@/data/usecases/alert'
import { AccountFirebaseRepository } from '@/infra/repositories/firebase/account'
import { AlertFirebaseRepository } from '@/infra/repositories/firebase/alert'
import { AppLayout } from '@/presentation/pages/_layouts'

export function MakeAppLayout() {
  const accountFirebaseRepository = new AccountFirebaseRepository()
  const logout = new LogoutImpl(accountFirebaseRepository)
  const alertFirebaseRepository = new AlertFirebaseRepository()
  const watchAlerts = new WatchAlertsImpl(alertFirebaseRepository)
  const updateAlert = new UpdateAlertImpl(alertFirebaseRepository)
  return (
    <AppLayout
      logout={logout}
      watchAlerts={watchAlerts}
      updateAlert={updateAlert}
    />
  )
}
