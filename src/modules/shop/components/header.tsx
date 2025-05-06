import UserPopover from '@auth/session/user-popover'
import InstallButton from '@shared/components/install-button'
import { SidebarTrigger } from '@/modules/shared/components/ui/sidebar'

import { CartButton } from '../cart/cart-ui'

export default function Header() {
  return (
    <header className="w-full h-[60px] flex items-center justify-between px-5 sticky top-0 z-50 border-b border-border bg-background">
      <div className="sm:hidden"></div>
      <div className="max-sm:hidden">
        <SidebarTrigger size={'lg'} />
      </div>

      <div className="flex-center gap-2">
        <InstallButton />
        <UserPopover />
        <CartButton />
      </div>
    </header>
  )
}
