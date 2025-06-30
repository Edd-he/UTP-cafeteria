'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'

export function TooglePaymentMethod() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentStatus = searchParams.get('method') || 'all'

  function handleOrder(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('method', term)
    } else {
      params.delete('method')
    }
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select onValueChange={handleOrder} defaultValue={currentStatus}>
      <SelectTrigger className=" max-w-64 w-full h-12 ">
        <span>Método: </span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={10} hideWhenDetached>
        <SelectItem value="all">Todos</SelectItem>

        <SelectItem value="YAPE">YAPE</SelectItem>
        <SelectItem value="PLIN">PLIN</SelectItem>
        <SelectItem value="TARJETA">TARJETA</SelectItem>
      </SelectContent>
    </Select>
  )
}
