import { ReactNode } from 'react'
import { MobileNavegation } from '@shop/components/mobile-nav'
import Header from '@shop/components/header'

import { SidebarProvider } from '@/modules/shared/components/ui/sidebar'
import { AppSidebar } from '@/modules/shared/components/app-sidebar/app-sidebar'
import { MyOrdersNotification } from '@/modules/shop/components/my-orders-notification'
import ServiceWorkerRegister from '@/modules/shop/components/service-worker-register'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full ">
          <Header />
          <div className="w-full px-5 ">{children}</div>
          <ServiceWorkerRegister />
        </div>
        <MobileNavegation />
        <MyOrdersNotification />
      </SidebarProvider>
    </>
  )
}
