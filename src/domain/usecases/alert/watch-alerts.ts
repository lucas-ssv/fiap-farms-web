import type { AlertModel } from '@/domain/models/alert'

export interface WatchAlerts {
  execute: (userId: string, onChange: WatchAlerts.Params) => WatchAlerts.Result
}

export namespace WatchAlerts {
  export type Params = (alerts: AlertModel[]) => void

  export type Result = () => void
}
