import InstallButton from '@shared/components/install-button'
import { SidebarTrigger } from '@shared/components/ui/sidebar'
import UserPopover from '@auth/session/user-popover'

import { CartButton } from '../cart/cart-ui'

export default function Header() {
  return (
    <header className="w-full h-[60px] flex items-center justify-between px-5 sticky top-0 z-50 border-b border-border bg-background">
      <div className="sm:hidden"></div>
      <div className="max-sm:hidden">
        <SidebarTrigger size={'lg'} />
      </div>

      <div className="flex-center gap-1">
        <InstallButton />
        <CartButton />
        <UserPopover />
      </div>
    </header>
  )
}
