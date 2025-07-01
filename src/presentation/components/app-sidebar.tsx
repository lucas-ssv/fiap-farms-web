import * as React from 'react'
import {
  AudioWaveform,
  BanknoteArrowDown,
  ChartArea,
  ChartLine,
  CircleAlert,
  CircleDollarSign,
  CircleGauge,
  Command,
  Eye,
  GalleryVerticalEnd,
  Layers,
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

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
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
      url: '#',
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
          url: '#',
          icon: Plus,
        },
      ],
    },
    {
      title: 'Metas',
      url: '#',
      icon: ChartLine,
      items: [
        {
          title: 'Ver metas',
          url: '#',
          icon: Eye,
        },
        {
          title: 'Nova meta de produto',
          url: '#',
          icon: Plus,
        },
        {
          title: 'Nova meta de venda',
          url: '#',
          icon: Plus,
        },
      ],
    },
    {
      title: 'Produção',
      url: '#',
      icon: ChartArea,
      items: [
        {
          title: 'Lotes em produção',
          url: '#',
          icon: Eye,
        },
        {
          title: 'Nova produção',
          url: '#',
          icon: Plus,
        },
      ],
    },
    {
      title: 'Estoque',
      url: '#',
      icon: Layers,
      items: [
        {
          title: 'Movimentações de estoque',
          url: '#',
          icon: Eye,
        },
        {
          title: 'Nova entrada/saída de estoque',
          url: '#',
          icon: Plus,
        },
        {
          title: 'Alertas de estoque',
          url: '#',
          icon: CircleAlert,
        },
      ],
    },
    {
      title: 'Despesas',
      url: '#',
      icon: BanknoteArrowDown,
      items: [
        {
          title: 'Ver despesas',
          url: '#',
          icon: Eye,
        },
        {
          title: 'Nova despesa',
          url: '#',
          icon: Plus,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
