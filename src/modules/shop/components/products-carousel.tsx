/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client'
import { useState } from 'react'

import CustomImage from '@shared/components/custom-image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@shared/components/ui/carousel'

import { AddCartProductButton } from '../cart/add-product-button'
import { ProductsCarouselSkeleton } from '../skelletons/products-carousel-skeleton'
import { Product } from '../interfaces/products.interfaces'

interface Props {
  category: string
  limit: number
}

export function ProductsCarousel({ category, limit }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <Carousel
      className="w-full"
      opts={{
        align: 'start',
        dragFree: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-3">
        {loading ? (
          <ProductsCarouselSkeleton items={6} />
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <CarouselItem
              key={index}
              className={
                'pl-2 md:pl-3 basis-[65%] xs:basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 '
              }
            >
              <Card className="p-3 h-80 relative flex flex-col justify-between hover:bg-muted/40 duration-200">
                <CardHeader className="p-0">
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 py-2 flex-center">
                  <CustomImage
                    src={product.img}
                    width={140}
                    height={140}
                    alt="a"
                    category={category}
                  />
                </CardContent>
                <CardFooter className="p-0 flex justify-between">
                  <span className="leading-none">
                    S/ {parseFloat(product.price).toFixed(2)}
                  </span>
                  <AddCartProductButton product={product} />
                </CardFooter>
              </Card>
            </CarouselItem>
          ))
        ) : (
          <div className="w-full h-80 text-center flex-center">
            No hay Productos Disponibles
          </div>
        )}
      </CarouselContent>
      <div className="max-sm:hidden">
        <CarouselPrevious
          className="p-2 w-12 rounded-none border-none h-full group hover:bg-secondary dark:hover:text-primary disabled:text-muted-foreground"
          iconClassName="h-10 w-10 group-hover:scale-110 duration-200"
        />
        <CarouselNext
          className="p-2 w-12 rounded-none border-none h-full group hover:bg-secondary dark:hover:text-primary disabled:text-muted-foreground"
          iconClassName="h-10 w-10 group-hover:scale-110 duration-200"
        />
      </div>
    </Carousel>
  )
}
