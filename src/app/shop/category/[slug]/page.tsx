import { RxCaretLeft } from 'react-icons/rx'
import Link from 'next/link'
import { Button } from '@shared/components/ui/button'
import ProductsGrid from '@shop/components/products-grid'
import { SearchByName } from '@shared/filters'
import FiltersContainer from '@shop/components/filters-container'
import { Suspense } from 'react'

import { PRODUCT_CATEGORIRES } from '@/lib/categories'
import { SlideTransition } from '@/modules/shared/components/slide-transition'

type SearchParams = {
  query?: string
  max?: string
  order?: string
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIRES.map((category) => ({
    slug: category.slug,
  }))
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const { query, max, order } = await searchParams
  const category = PRODUCT_CATEGORIRES.find(
    (category) => category.slug === slug,
  )
  const Icon = category?.icon

  const queryValue = query || ''
  const maxValue = max || '100'
  const orderValue = order || 'asc'

  return (
    <main className="relative w-full flex flex-col gap-10 pt-10 pb-24">
      <section className="container flex sm:items-center gap-5 max-sm:flex-col">
        <Button
          asChild
          variant={'outline'}
          size={'icon'}
          className="rounded-full h-10 w-10"
        >
          <Link href={'/shop'}>
            <RxCaretLeft size={40} />
          </Link>
        </Button>
        {category ? (
          <div className="flex items-center gap-3 py-2">
            {Icon && (
              <SlideTransition name={`category-icon-${slug}`}>
                <Icon size={60} className=" text-primary" />
              </SlideTransition>
            )}
            <SlideTransition key={category.id} name={`category-${slug}`}>
              <h2 className="text-4xl">{category.name}</h2>
            </SlideTransition>
          </div>
        ) : (
          <p>Categoría no encontrada</p>
        )}
      </section>

      <section className="container">
        <FiltersContainer />
      </section>

      <section className="container">
        <Suspense>
          <SearchByName className="focus-visible:h-14" />
        </Suspense>
      </section>

      <section className="relative sm:container">
        <ProductsGrid
          max={maxValue}
          order={orderValue}
          query={queryValue}
          category={category?.value}
        />
      </section>
    </main>
  )
}
