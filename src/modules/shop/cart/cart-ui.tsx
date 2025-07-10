'use client'
import { FiShoppingCart } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiOutlineLoading } from 'react-icons/ai'
import CustomImage from '@shared/components/custom-image'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@shared/components/ui/drawer'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@shared/components/ui/dialog'
import { Button } from '@shared/components/ui/button'

import RemoveCartProductButton from './remove-cart-product-button'

import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { useCartStore } from '@/store/cart-store'

const CartIcon = ({ click }: { click: () => void }) => {
  const totalQuantity = useCartStore((state) =>
    state.getTotalProductsQuantity(),
  )
  const [loaded, setloaded] = useState(false)

  useEffect(() => {
    setloaded(true)
  }, [])

  return (
    <Button
      variant={'ghost'}
      onClick={click}
      disabled={!loaded}
      className="duration-200 w-14 flex-center gap-1"
      size={'lg'}
    >
      {loaded ? (
        <>
          {totalQuantity}
          <FiShoppingCart size={30} strokeWidth={3} />
        </>
      ) : (
        <AiOutlineLoading size={25} className="animate-spin ease-in-out" />
      )}
    </Button>
  )
}

const Content = ({ click }: { click: () => void }) => {
  const cartProducts = useCartStore((state) => state.cart)
  const cartTotalPrice = useCartStore((state) => state.getFinalPrice())
  return (
    <>
      <div className="relative w-full overflow-y-auto h-96 custom-scrollbar">
        {cartProducts.length > 0 ? (
          cartProducts.map((product, index) => (
            <div
              key={index}
              className="duration-200 hover:bg-muted/40 relative flex justify-between items-center w-full px-5 h-32 rounded"
            >
              <div className="flex gap-3">
                <CustomImage
                  src={product.url}
                  height={90}
                  width={90}
                  alt=""
                  className="rounded"
                  category={product.category}
                />
                <div className="flex flex-col justify-center gap-1">
                  <span className="leading-none tracking-tight font-semibold text-sm sm:text-lg max-w-[200px] sm:max-w-[400px] truncate">
                    {product.nombre}
                  </span>
                  <span className="max-sm:text-xs text-sm text-muted-foreground">
                    {product.cantidad} <span> x </span>{' '}
                    <span>S/ {product.precio}</span>
                  </span>

                  <span className="leading-none tracking-tight max-sm:text-sm">
                    Subtotal: S/ {product.cantidad * product.precio}
                  </span>
                </div>
              </div>
              <RemoveCartProductButton product={product} />
            </div>
          ))
        ) : (
          <div className="h-32 flex-center">
            <span className="font-semibold leading-none tracking-tight">
              No tiene productos en su carrito
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 px-5 mt-4 text-xl">
        <span>Total: S/ {cartTotalPrice.toFixed(2)}</span>
        <Button asChild className="w-full text-xl" onClick={click}>
          <Link href={'/shop/cart'}>Ir a Pagar</Link>
        </Button>
      </div>
    </>
  )
}

export function CartButton() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const toggleOpen = () => setOpen(!open)

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <CartIcon click={toggleOpen} />
        <DialogContent className="sm:max-w-[768px]">
          <DialogHeader>
            <DialogTitle>Tu Carrito</DialogTitle>
          </DialogHeader>
          <div className="w-full h-[550px] relative flex flex-col justify-between">
            <Content click={toggleOpen} />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer shouldScaleBackground open={open} onOpenChange={setOpen}>
      <CartIcon click={toggleOpen} />
      <DrawerContent className="border rounded-t-xl dark:border-t-primary">
        <DrawerHeader className="text-center">
          <DrawerTitle>Tu Carrito</DrawerTitle>
        </DrawerHeader>
        <div className="w-full h-[550px] relative flex flex-col justify-start">
          <Content click={toggleOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
