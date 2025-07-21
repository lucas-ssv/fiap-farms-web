import * as React from 'react'
import {
  ChartArea,
  ChartLine,
  CircleDollarSign,
  CircleGauge,
  Eye,
  LayoutList,
  List,
  Plus,
} from 'lucide-react'

import { NavMain } from '@/presentation/components/nav-main'
import { NavUser } from '@/presentation/components/nav-user'
import { TeamSwitcher } from '@/presentation/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/presentation/components/ui/sidebar'
import { Link } from 'react-router'
import type { Logout } from '@/domain/usecases/account'

const data = {
  navMain: [
    {
      title: 'Produtos',
      url: '/products',
      icon: LayoutList,
      isActive: true,
      items: [
        {
          title: 'Listar produtos',
          url: '/products',
          icon: List,
          isActive: true,
        },
        {
          title: 'Novo produto',
          url: '/products/new',
          icon: Plus,
        },
        {
          title: 'Listar categorias',
          url: '/categories',
          icon: List,
        },
        {
          title: 'Nova categoria',
          url: '/categories/new',
          icon: Plus,
        },
      ],
    },
    {
      title: 'Vendas',
      url: '/sales',
      icon: CircleDollarSign,
      items: [
        {
          title: 'Listar vendas',
          url: '/sales',
          icon: List,
        },
        {
          title: 'Nova venda',
          url: '/sales/new',
          icon: Plus,
        },
        {
          title: 'Listar clientes',
          url: '/customers',
          icon: List,
        },
        {
          title: 'Novo cliente',
          url: '/customers/new',
          icon: Plus,
        },
      ],
    },
    {
      title: 'Metas',
      url: '/goals',
      icon: ChartLine,
      items: [
        {
          title: 'Ver metas',
          url: '/goals',
          icon: Eye,
        },
        {
          title: 'Nova meta',
          url: '/goals/new',
          icon: Plus,
        },
      ],
    },
    {
      title: 'Produção',
      url: '/productions',
      icon: ChartArea,
      items: [
        {
          title: 'Lotes em produção',
          url: '/productions',
          icon: Eye,
        },
        {
          title: 'Nova produção',
          url: '/productions/new',
          icon: Plus,
        },
      ],
    },
  ],
}

type Props = React.ComponentProps<typeof Sidebar> & {
  logout: Logout
}

export function AppSidebar({ logout, ...props }: Props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="Dashboard">
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <CircleGauge />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser logout={logout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
