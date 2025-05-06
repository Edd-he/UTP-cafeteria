/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'

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
import { Product } from '@shop/interfaces/products.interfaces'

import { AddCartProductButton } from '../cart/add-product-button'

interface Props {
  category?: string
  query: string
  page: number
  max: number
  order: string
}

export default function ProductsGrid({ category }: Props) {
  const [products] = useState<Product[]>([])
  const [loading] = useState<boolean>(false)
  const [,] = useState<number>(0)

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-5">
      {loading ? (
        <ProductsGridSkeleton items={15} />
      ) : products.length > 0 ? (
        products.map((product, index) => (
          <article key={index}>
            <Card className=" p-3 h-44 sm:h-80 relative flex sm:flex-col max-sm:items-center sm:justify-between max-sm:rounded-none hover:bg-muted/40 duration-200">
              <CardHeader className="p-0 max-sm:ml-2">
                <CardTitle className="text-base">{product.name}</CardTitle>
                <CardDescription className="text-base">
                  {product.description}
                </CardDescription>
                <span className="leading-none sm:hidden dark:text-white text-primary-foreground">
                  S/ {product.price}
                </span>
              </CardHeader>
              <CardContent className="p-0 py-2 flex-center max-sm:order-first">
                <CustomImage
                  src={product.img}
                  width={140}
                  height={140}
                  alt="a"
                  category={category}
                  className="max-sm:h-24 max-sm:w-auto"
                />
              </CardContent>
              <CardFooter className="p-0 flex justify-between max-sm:order-last max-sm:ml-auto ">
                <span className="leading-none max-sm:hidden">
                  S/ {parseFloat(product.price).toFixed(2)}
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
