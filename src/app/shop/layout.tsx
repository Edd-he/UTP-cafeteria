import { ReactNode } from 'react'

import { MobileNavegation } from '@shop/components/mobile-nav'
import Header from '@shop/components/header'
import { SidebarProvider } from '@/modules/shared/components/ui/sidebar'
import { AppSidebar } from '@/modules/shop/components/app-sidebar/app-sidebar'
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <Header />
          <div className="w-full  px-5 bg-neutral-50">{children}</div>
        </div>
        <MobileNavegation />
      </SidebarProvider>
    </>
  )
}
