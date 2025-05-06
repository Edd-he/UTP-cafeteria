'use client'
import { CiTrash } from 'react-icons/ci'

import { CartProduct } from '@shop/interfaces/products.interfaces'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@shared/components/ui/button'

type Props = {
  product: CartProduct
}

export default function RemoveProductButton({ product }: Props) {
  const removeProduct = useCartStore((state) => state.removeProduct)

  return (
    <Button
      size={'icon'}
      variant={'outline'}
      onClick={() => removeProduct(product)}
    >
      <CiTrash size={22} />
    </Button>
  )
}
