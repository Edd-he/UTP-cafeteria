'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IoSearchOutline } from 'react-icons/io5'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '@shared/components/ui/input'

export default function SearchOrders() {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 300)

  return (
    <label className="relative flex-center">
      <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e) => {
          debouncedHandleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
        placeholder="Buscar por nombre del Cliente"
        className="rounded-lg bg-background pl-8 w-full h-12 focus-visible:h-16 transition-[height] duration-200"
      />
    </label>
  )
}
