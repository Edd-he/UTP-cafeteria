'use client'
import { CiTrash } from 'react-icons/ci'
import { Button } from '@shared/components/ui/button'

import { CartProduct } from '@/modules/shared/types/product.interfaces'
import { useCartStore } from '@/store/cart-store'

type Props = {
  product: CartProduct
}

export default function RemoveCartProductButton({ product }: Props) {
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
