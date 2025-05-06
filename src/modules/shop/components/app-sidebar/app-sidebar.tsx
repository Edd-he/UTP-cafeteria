'use client'
import type * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@shared/components/ui/sidebar'
import { SHOP_LINKS } from '@/config/links'
import UTP from '@/modules/shared/components/UTP'

import { NavMain } from './nav-main'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-none">
      <SidebarHeader
        className={
          'text-4xl p-0 h-[60px] group-data-[collapsible=icon]:text-xl transition-all duration-300 '
        }
      >
        <UTP iconClassName="group-data-[collapsible=icon]:size-3 size-[28px] transition-all duration-300" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain links={SHOP_LINKS} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
