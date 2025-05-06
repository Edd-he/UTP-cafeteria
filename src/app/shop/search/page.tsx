import { RxCaretLeft } from 'react-icons/rx'
import Link from 'next/link'
import { Suspense } from 'react'

import { Button } from '@/modules/shared/components/ui/button'
import ProductsGrid from '@/modules/shop/components/products-grid'
import SearchProducts from '@/modules/shop/components/search-products'

type SearchParams = {
  query?: string
  page?: string
  max?: string
  order?: string
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: Props) {
  const { query, page, max, order } = await searchParams
  const queryValue = query || ''
  const currentPage = Number(page) || 1
  const maxValue = Number(max) || 100
  const orderValue = order || 'asc'

  return (
    <main className="flex flex-col w-full gap-16 pt-10 pb-24">
      <section className="container relative flex sm:items-center gap-5 max-sm:flex-col">
        <Button
          asChild
          variant={'outline'}
          size={'icon'}
          className="rounded-full h-10 w-10"
        >
          <Link href={'/shop'} scroll={false}>
            <RxCaretLeft size={40} />
          </Link>
        </Button>
        {query === '' ? (
          <h2 className="text-5xl">Nuestros Productos</h2>
        ) : (
          <h2 className="text-4xl sm:text-5xl">
            Productos relacionados con &quot;
            <span className="text-primary">{query}</span>&quot;
          </h2>
        )}
      </section>
      <section className="container relative ">
        <Suspense>
          <SearchProducts />
        </Suspense>
      </section>
      <section className="relative sm:container">
        <ProductsGrid
          page={currentPage}
          max={maxValue}
          order={orderValue}
          query={queryValue}
        />
      </section>
    </main>
  )
}
