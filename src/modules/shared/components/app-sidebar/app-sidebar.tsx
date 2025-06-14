'use client'
import type * as React from 'react'
import clsx from 'clsx'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@shared/components/ui/sidebar'

import { NavMain } from './nav-main'

import { SHOP_LINKS, ADMIN_LINKS } from '@/config/links'
import UTP from '@/modules/shared/components/UTP'

type Variant = 'cliente' | 'admin'

export function AppSidebar({
  typeSidebar = 'cliente',
  ...props
}: React.ComponentProps<typeof Sidebar> & { typeSidebar?: Variant }) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className={clsx('border-none', props.className)}
    >
      <SidebarHeader className="text-4xl p-0 h-[60px] group-data-[collapsible=icon]:text-xl transition-all duration-300">
        <UTP iconClassName="group-data-[collapsible=icon]:size-2.5 size-[24px] transition-all duration-300" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          variant={typeSidebar}
          links={typeSidebar === 'admin' ? ADMIN_LINKS : SHOP_LINKS}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
