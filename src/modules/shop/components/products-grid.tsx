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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-5">
      {loading ? (
        <ProductsGridSkeleton items={15} />
      ) : products && products.data.length > 0 ? (
        products.data.map((product, index) => (
          <article key={index}>
            <Card className="p-4 h-44 md:h-80 relative max-md:flex-row max-sm:items-center md:justify-between max-md:rounded-none hover:bg-muted/40 duration-200">
              <CardHeader className="p-0 max-sm:ml-2 text-base">
                <CardTitle>{product.nombre}</CardTitle>
                <CardDescription>{product.descripcion}</CardDescription>
                <span className="leading-none md:hidden">
                  S/ {product.precio}
                </span>
              </CardHeader>
              <CardContent className="p-0 py-2 flex-center max-md:order-first">
                <CustomImage
                  src={product.url}
                  height={90}
                  width={90}
                  alt={product.nombre}
                  category={product.categoria}
                />
              </CardContent>
              <CardFooter className="p-0 flex justify-between max-md:order-last max-md:ml-auto ">
                <span className="leading-none max-md:hidden">
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
