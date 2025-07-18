import { Outlet } from 'react-router'

import { AppSidebar } from '@/presentation/components'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Separator,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Badge,
} from '@/presentation/components/ui'
import { Bell } from 'lucide-react'
import type { Logout } from '@/domain/usecases/account'
import type { UpdateAlert, WatchAlerts } from '@/domain/usecases/alert'
import { useEffect, useState } from 'react'
import type { AlertModel } from '@/domain/models/alert'
import { toast } from 'sonner'

type Props = {
  logout: Logout
  watchAlerts: WatchAlerts
  updateAlert: UpdateAlert
}

export function AppLayout({ logout, watchAlerts, updateAlert }: Props) {
  const [alerts, setAlerts] = useState<AlertModel[]>([])
  const [unreadAlerts, setUnreadAlerts] = useState(0)

  const handleReadAlerts = async (open: boolean) => {
    try {
      if (open) {
        const unreadAlerts = alerts.filter((alert) => !alert.read)
        for (const alert of unreadAlerts) {
          await updateAlert.execute(alert.id, { read: true })
        }
      }
    } catch (error) {
      toast.error('Erro ao marcar notificações como lidas.')
    }
  }

  useEffect(() => {
    const unsubscribe = watchAlerts.execute((alerts) => {
      setAlerts(alerts)
      const unreadAlerts = alerts.filter((alert) => !alert.read)
      if (unreadAlerts.length > 0) {
        toast.success(
          `Você tem ${unreadAlerts.length} nova(s) notificação(ões).`,
          {
            position: 'top-right',
          }
        )
      }
      setUnreadAlerts(unreadAlerts.length)
    })

    return () => unsubscribe()
  }, [watchAlerts])

  return (
    <SidebarProvider>
      <AppSidebar logout={logout} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <Popover onOpenChange={handleReadAlerts}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="mr-4">
                {unreadAlerts > 0 && (
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                    {unreadAlerts}
                  </Badge>
                )}
                <Bell />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  {alerts.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Nenhuma notificação
                    </p>
                  ) : (
                    <>
                      <h4 className="leading-none font-medium">Notificações</h4>
                      <div className="grid gap-3 mt-4">
                        {alerts.map((alert) => (
                          <div key={alert.id}>
                            <div className="text-muted-foreground text-sm">
                              🎉 Meta de{' '}
                              {alert.type === 'sales' ? (
                                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                                  vendas
                                </div>
                              ) : (
                                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">
                                  produção
                                </div>
                              )}{' '}
                              atingida para o produto {alert.product.name}.
                              Parabéns! 🥳
                            </div>
                            <small className="text-neutral-400 text-xs">
                              {(alert.createdAt as any)
                                .toDate()
                                .toLocaleDateString()}{' '}
                              {(alert.createdAt as any)
                                .toDate()
                                .toLocaleTimeString()}
                            </small>
                            {/* <Separator className="my-2" /> */}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-0 mb-20">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
