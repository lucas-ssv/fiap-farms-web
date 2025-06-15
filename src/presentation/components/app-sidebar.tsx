import * as React from 'react'
import {
  AudioWaveform,
  BanknoteArrowDown,
  ChartArea,
  ChartLine,
  CircleDollarSign,
  CircleGauge,
  Command,
  Frame,
  GalleryVerticalEnd,
  Layers,
  LayoutList,
  Map,
  PieChart,
  SquareTerminal,
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
      url: '#',
      icon: LayoutList,
      items: [
        {
          title: 'Listar produtos',
          url: '#',
        },
        {
          title: 'Adicionar produto',
          url: '#',
        },
        {
          title: 'Categorias',
          url: '#',
        },
        {
          title: 'Nova categoria',
          url: '#',
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
          url: '#',
        },
        {
          title: 'Nova venda',
          url: '#',
        },
        {
          title: 'Clientes',
          url: '#',
        },
        {
          title: 'Cadastrar cliente',
          url: '#',
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
        },
        {
          title: 'Nova meta de produto',
          url: '#',
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
        },
        {
          title: 'Nova produção',
          url: '#',
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
        },
        {
          title: 'Nova entrada/saída de estoque',
          url: '#',
        },
        {
          title: 'Alertas de estoque',
          url: '#',
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
        },
        {
          title: 'Nova despesa',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
    {
      name: 'Support',
      url: '#',
      icon: SquareTerminal,
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
                <SidebarMenuButton asChild isActive>
                  <a href="#">
                    <CircleGauge />
                    <span>Dashboard</span>
                  </a>
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
