import { ReactNode } from 'react'

import { SidebarProvider } from '@/modules/shared/components/ui/sidebar'
import { AppSidebar } from '@/modules/shared/components/app-sidebar/app-sidebar'
import AdminHeader from '@/modules/admin/components/header'
import { OrdersNotifications } from '@/modules/admin/orders/orders-notifications'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar typeSidebar="admin" />
        <div className="w-full">
          <AdminHeader />
          <div className="w-full h-[calc(100dvh-60px)] relative px-2 py-5 sm:p-10 flex flex-col gap-5 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-background scrollbar-thumb-primary">
            {children}
          </div>
          <OrdersNotifications />
        </div>
      </SidebarProvider>
    </>
  )
}
