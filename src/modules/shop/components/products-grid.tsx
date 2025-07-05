'use client'

import { useEffect, useRef } from 'react'
import CustomImage from '@shared/components/custom-image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import { toast } from 'sonner'
import useSWRInfinite from 'swr/infinite'

import { AddCartProductButton } from '../cart/add-cart-product-button'

import ProductsGridSkeleton from '@/modules/shop/skeletons/products-grid-skeleton'
import { Product } from '@/modules/shared/types/product.interfaces'
import { BACKEND_URL } from '@/lib/constants'
import { fetcher } from '@/lib/http/fetcher'

type Props = {
  category?: string
  query: string
  max: string
  order: string
}

type GetProducts = {
  data: Product[]
  total: number
  totalPages: number
}

export default function ProductsGrid({ query, max, order, category }: Props) {
  const PAGE_SIZE = 8

  const getKey = (pageIndex: number, previousPageData: GetProducts | null) => {
    if (previousPageData && previousPageData.data.length === 0) return null

    return `${BACKEND_URL}/productos/obtener-productos-disponibles?max_price=${max}&query=${query}&order=${order}&page=${pageIndex + 1}&page_size=${PAGE_SIZE}${category ? `&category=${category}` : ''}`
  }

  const { data, error, isLoading, setSize, isValidating } =
    useSWRInfinite<GetProducts>(getKey, fetcher)

  const loaderReference = useRef<HTMLDivElement | null>(null)

  const isEnd = data && (data[data.length - 1]?.data.length ?? 0) < PAGE_SIZE

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isEnd) {
          setSize((prev) => prev + 1)
        }
      },
      { threshold: 1 },
    )

    const currentLoader = loaderReference.current
    if (currentLoader) observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [setSize, isEnd])

  if (error) toast.error(error.message)

  const allProducts = data?.flatMap((page) => page.data) || []

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
      {isLoading && <ProductsGridSkeleton items={15} />}

      {allProducts.length > 0
        ? allProducts.map((product, index) => (
            <article key={index}>
              <Card className="p-4 h-44 md:h-80 relative max-md:flex-row max-md:items-center md:justify-between max-md:rounded-none hover:bg-muted/40 duration-200">
                <CardHeader className="p-0 text-base w-full">
                  <CardTitle>{product.nombre}</CardTitle>
                  <CardDescription className="text-base max-md:text-xs">
                    {product.descripcion}
                  </CardDescription>
                  <span className="leading-none md:hidden">
                    S/ {product.precio}
                  </span>
                </CardHeader>
                <CardContent className="p-0 py-2 flex-center max-md:order-first max-md:w-[40%] w-full">
                  <CustomImage
                    src={product.url}
                    className="size-25 m-auto"
                    height={100}
                    width={100}
                    alt={product.nombre}
                    category={product.categoria}
                  />
                </CardContent>
                <CardFooter className="p-0 flex justify-between max-md:order-last max-md:ml-auto">
                  <span className="leading-none max-md:hidden">
                    S/ {product.precio}
                  </span>
                  <AddCartProductButton product={product} />
                </CardFooter>
              </Card>
            </article>
          ))
        : !isLoading && (
            <div className="relative h-96 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 text-center w-full">
              No hay productos disponibles
            </div>
          )}

      <div
        ref={loaderReference}
        className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 py-10 flex justify-center"
      >
        {!isEnd && isValidating && <ProductsGridSkeleton items={5} />}
      </div>
    </div>
  )
}
