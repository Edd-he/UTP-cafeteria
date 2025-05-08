import Link from 'next/link'
import { Suspense } from 'react'

import UserWelcome from '@auth/session/user-welcome'
import { ProductsCarousel } from '@shop/components/products-carousel'
import { Button } from '@shared/components/ui/button'
import { CATEGORIES } from '@/lib/categories'
import GridCategories from '@shop/components/categories-grid'
import SearchProducts from '@shop/components/search-products'

export const dynamic = 'force-dynamic'
export default async function Page() {
  const limit = 8

  return (
    <>
      <main className="w-full flex flex-col gap-16 pt-10 pb-24">
        <section className="relative container flex-center my-5 sm:my-10">
          <UserWelcome />
        </section>

        <section className="relative w-full">
          <GridCategories />
        </section>

        <section className="container relative">
          <Suspense>
            <SearchProducts />
          </Suspense>
        </section>
        {CATEGORIES.map((category, index) => (
          <section
            key={index}
            className="relative container space-y-5 max-sm:p-0"
          >
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <h2 className="text-lg sm:text-xl leading-none tracking-tight">
                    {category.name}
                  </h2>
                </div>
                <p className="text-muted-foreground">Lo más vendido</p>
              </div>
              <Button asChild variant={'link'} className="text-lg">
                <Link href={`/shop/category/${category.slug}`}>Ver Más</Link>
              </Button>
            </div>
            <ProductsCarousel category={category.slug} limit={limit} />
          </section>
        ))}
      </main>
    </>
  )
}
