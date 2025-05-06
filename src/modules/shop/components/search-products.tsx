'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { IoSearchOutline } from 'react-icons/io5'
import { useDebouncedCallback } from 'use-debounce'
import {
  startTransition,
  unstable_ViewTransition as ViewTransition,
} from 'react'

import { Input } from '@shared/components/ui/input'

export default function SearchProducts() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    params.set('page', '1')

    startTransition(() => {
      push(`/shop/search?${params.toString()}`, { scroll: true })
    })
  }

  const debouncedHandleSearch = useDebouncedCallback(handleSearch, 600)

  return (
    <label className="relative flex-center">
      <ViewTransition name="search-products-icon">
        <IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </ViewTransition>
      <ViewTransition name="search-products-input">
        <Input
          onChange={(e) => {
            debouncedHandleSearch(e.target.value)
          }}
          defaultValue={searchParams.get('query')?.toString()}
          placeholder="Buscar Productos"
          className="rounded-lg bg-background pl-8 w-full h-12 focus-visible:h-16 transition-[height] duration-200"
        />
      </ViewTransition>
    </label>
  )
}
