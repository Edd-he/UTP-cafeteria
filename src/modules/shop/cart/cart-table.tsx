'use client'

import CustomImage from '@shared/components/custom-image'
import { ShoppingCart } from 'lucide-react'

import QuantitySelector from './quantity-selector'

import RemoveCartProductButton from '@/modules/shop/cart/remove-cart-product-button'
import { useCartStore } from '@/store/cart-store'

export function CartTable() {
  const cart = useCartStore((state) => state.cart)

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <table className="w-full table-auto relative divide-y-2 divide-border">
          <thead className="sticky top-0 bg-background z-10">
            <tr className="h-14">
              <td className="tracking-tight leading-none">Producto(s)</td>
              <td className="tracking-tight leading-none">Cantidad</td>
              <td className="tracking-tight leading-none">Precio/U</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="text-sm">
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <tr key={index} className="hover:bg-muted/40 duration-200">
                  <td className="flex gap-2 items-center h-32">
                    <CustomImage
                      src={product.url}
                      width={96}
                      height={96}
                      alt="a"
                      category={product.category}
                      className="h-24 w-auto rounded"
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
      </div>

      <div className="lg:hidden space-y-4">
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <div
              key={index}
              className="bg-card border rounded-lg p-4 space-y-4 hover:bg-muted/40 duration-200"
            >
              <div className="flex gap-3">
                <CustomImage
                  src={product.url}
                  width={80}
                  height={80}
                  alt="a"
                  category={product.category}
                  className="h-20 w-20 rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold tracking-tight leading-none text-sm">
                    {product.nombre}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                    {product.descripcion}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <RemoveCartProductButton product={product} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <QuantitySelector product={product} />
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Precio/U</div>
                  <div className="font-semibold">S/ {product.precio}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-2">
              <ShoppingCart className="h-12 w-12 mx-auto" />
            </div>
            <p>No tiene productos en el carrito</p>
          </div>
        )}
      </div>
    </div>
  )
}
