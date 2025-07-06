import Link from 'next/link'

import { Button } from '@/modules/shared/components/ui/button'
import Logo from '@/modules/shared/components/logo'

export default function Page() {
  return (
    <div className="w-full h-[calc(100dvh-60px)] bg-background flex-center flex-col gap-5">
      <div className="flex-center">
        <Logo />
      </div>
      <Button asChild className="text-lg w-40">
        <Link href={'/shop'}>Regresar</Link>
      </Button>
    </div>
  )
}
