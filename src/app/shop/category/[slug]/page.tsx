import { RxCaretLeft } from 'react-icons/rx'
import Link from 'next/link'

import { Button } from '@shared/components/ui/button'
import ProductsGrid from '@shop/components/products-grid'
import { SearchByName } from '@shared/filters'
import FiltersContainer from '@shop/components/filters-container'
import { CATEGORIES } from '@/lib/categories'
import { SlideTransition } from '@/modules/shared/components/slide-transition'

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

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }))
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const { query, page, max, order } = await searchParams
  const category = CATEGORIES.find((category) => category.slug === slug)
  const Icon = category?.icon

  const queryValue = query || ''
  const currentPage = Number(page) || 1
  const maxValue = Number(max) || 100
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
        <SearchByName className="focus-visible:h-14" />
      </section>

      <section className="relative sm:container">
        <ProductsGrid
          page={currentPage}
          max={maxValue}
          order={orderValue}
          query={queryValue}
          category={slug}
        />
      </section>
    </main>
  )
}
