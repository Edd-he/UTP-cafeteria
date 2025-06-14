'use client'

import { useEffect } from 'react'
import CustomImage from '@shared/components/custom-image'
import ProductsGridSkeleton from '@shop/skelletons/products-grid-skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import { toast } from 'sonner'

import { AddCartProductButton } from '../cart/add-product-button'

import { Product } from '@/modules/shared/interfaces/product.interfaces'
import { useGetData } from '@/modules/shared/hooks/use-get-data'
import { BACKEND_URL } from '@/lib/constants'

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
  const {
    data: products,
    loading,
    error,
  } = useGetData<GetProducts>(
    `${BACKEND_URL}/productos/obtener-productos-disponibles?max_price=${max}&query=${query}&order=${order}${category ? `&category=${category}` : ''}`,
  )
  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-5">
      {loading ? (
        <ProductsGridSkeleton items={15} />
      ) : products && products.data.length > 0 ? (
        products.data.map((product, index) => (
          <article key={index}>
            <Card className=" p-3 h-44 sm:h-80 relative flex sm:flex-col max-sm:items-center sm:justify-between max-sm:rounded-none hover:bg-muted/40 duration-200">
              <CardHeader className="p-0 max-sm:ml-2">
                <CardTitle className="text-base">{product.nombre}</CardTitle>
                <CardDescription className="text-base">
                  {product.descripcion}
                </CardDescription>
                <span className="leading-none sm:hidden dark:text-white text-primary-foreground">
                  S/ {product.precio}
                </span>
              </CardHeader>
              <CardContent className="p-0 py-2 flex-center max-sm:order-first">
                <CustomImage
                  src={product.url}
                  width={140}
                  height={140}
                  alt="a"
                  category={category}
                  className="max-sm:h-24 max-sm:w-auto"
                />
              </CardContent>
              <CardFooter className="p-0 flex justify-between max-sm:order-last max-sm:ml-auto ">
                <span className="leading-none max-sm:hidden">
                  S/ {product.precio}
                </span>
                <AddCartProductButton product={product} />
              </CardFooter>
            </Card>
          </article>
        ))
      ) : (
        <div className="relative h-96 col-span-5 text-center w-full">
          No hay productos disponibles
        </div>
      )}
    </div>
  )
}
