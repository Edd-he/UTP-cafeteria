'use client'
import { useEffect, useState } from 'react'

import CartTimePicker from './cart-time-picker'

import { useCartStore } from '@/store/cart-store'

export function CartDetails() {
  const cartQuantity = useCartStore((state) => state.getTotalProductsQuantity())
  const finalPrice = useCartStore((state) => state.getFinalPrice())
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {loaded && (
        <>
          <div className="w-full flex items-center justify-between">
            <span className="tracking-tight leading-none">
              Cantidad de Productos:
            </span>
            <span>{cartQuantity}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="tracking-tight leading-none">
              Total Productos:
            </span>
            <span>S/ {finalPrice.toFixed(2)}</span>
          </div>
          <div className="w-full flex items-center justify-between">
            <span className="tracking-tight leading-none">Total:</span>
            <span>S/ {finalPrice.toFixed(2)}</span>
          </div>

          <CartTimePicker />
        </>
      )}
    </>
  )
}
