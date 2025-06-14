'use client'
import { AiOutlineLoading } from 'react-icons/ai'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useState } from 'react'
import { Button } from '@shared/components/ui/button'

import { useCartStore } from '@/store/cart-store'
import { sleep } from '@/lib/utils'
import type {
  CartProduct,
  Product,
} from '@/modules/shared/interfaces/product.interfaces'

type Props = {
  product: Product
}

export function AddCartProductButton({ product }: Props) {
  const addCartProduct = useCartStore((state) => state.addProduct)
  const [loading, setLoading] = useState(false)

  const addToCart = async () => {
    setLoading(true)

    await sleep(1000)
    const cartProduct: CartProduct = {
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: Number(product.precio),
      limite_de_orden: Math.min(product.stock, product.limite_de_orden),
      cantidad: 1,
      category: product.categoria,
      url: product.url,
    }

    addCartProduct(cartProduct)
    setLoading(false)
  }

  return (
    <Button
      size={'icon'}
      onClick={addToCart}
      disabled={loading}
      className={loading ? 'shadow-lg shadow-primary/40 ' : ' '}
    >
      {loading ? (
        <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
      ) : (
        <MdOutlineShoppingCart size={18} />
      )}
    </Button>
  )
}
