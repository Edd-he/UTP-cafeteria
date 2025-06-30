'use client'

import CustomImage from '@shared/components/custom-image'

import QuantitySelector from './quantity-selector'

import RemoveCartProductButton from '@/modules/shop/cart/remove-cart-product-button'
import { useCartStore } from '@/store/cart-store'

export function CartTable() {
  const cart = useCartStore((state) => state.cart)

  return (
    <table className="w-full table-auto relative divide-y-2 divide-border max-sm:w-[800px]">
      <thead className=" sticky top-0 bg-background z-10 ">
        <tr className="h-14">
          <td className=" tracking-tight leading-none">Producto(s)</td>
          <td className=" tracking-tight leading-none">Cantidad</td>
          <td className=" tracking-tight leading-none">Precio/U</td>
          <td></td>
        </tr>
      </thead>
      <tbody className="text-sm">
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <tr key={index} className="hover:bg-muted/40 duration-200 ">
              <td className="flex gap-2 items-center h-32">
                <CustomImage
                  src={product.url}
                  width={96}
                  height={96}
                  alt="a"
                  category={product.category}
                  className="h-24 w-auto"
                />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold tracking-tight leading-none">
                    {product.nombre}
                  </span>
                  <span className="text-muted-foreground">
                    {product.descripcion}
                  </span>
                </div>
              </td>
              <td>
                <QuantitySelector product={product} />
              </td>
              <td>S/ {product.precio}</td>
              <td>
                <RemoveCartProductButton product={product} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center h-32">
              No tiene productos en el carrito
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
