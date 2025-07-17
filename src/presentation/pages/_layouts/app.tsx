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

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="mr-4">
                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                  2
                </Badge>
                <Bell />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Notificações</h4>
                  <div className="grid gap-2">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Você bateu sua meta de vendas hoje!
                      </p>
                      <small className="text-muted-foreground text-xs">
                        2 horas atrás
                      </small>
                      <Separator className="my-2" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Você bateu sua meta de vendas hoje!
                      </p>
                      <small className="text-muted-foreground text-xs">
                        2 horas atrás
                      </small>
                      <Separator className="my-2" />
                    </div>
                  </div>
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
