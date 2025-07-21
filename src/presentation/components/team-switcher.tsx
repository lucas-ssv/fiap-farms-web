import {
  SidebarMenu,
  SidebarMenuButton,
} from '@/presentation/components/ui/sidebar'
import logoIcon from '@/presentation/assets/logo-icon.png'

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <img src={logoIcon} alt="Logo FIAP Farms" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium text-lg dark:text-white text-green-900">
            fiap farms
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenu>
  )
}
