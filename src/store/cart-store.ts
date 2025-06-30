/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CartProduct } from '@/modules/shared/types/product.interfaces'

type CartState = {
  cart: CartProduct[]
  time: Date
  setTime: (time: Date) => void
  updateTime: () => void
  getTotalProductsQuantity: () => number
  getFinalPrice: () => number
  addProduct: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
  resetItems: () => void
  isTimeValid: () => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      time: new Date(),

      setTime: (newTime: Date) => {
        const today = new Date()
        const updated = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          newTime.getHours(),
          newTime.getMinutes(),
          0,
          0,
        )
        set({ time: updated })
      },

      isTimeValid: () => {
        const { time } = get()
        const now = new Date()
        const scheduled = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          time.getHours(),
          time.getMinutes(),
          0,
          0,
        )

        const hour = scheduled.getHours()
        const timeRange = hour >= 9 && hour < 22
        const notPast = scheduled.getTime() >= now.getTime()

        return timeRange && notPast
      },

      updateTime: () => {
        set({ time: new Date() })
      },

      getTotalProductsQuantity: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.cantidad, 0)
      },

      getFinalPrice: () => {
        const { cart } = get()
        return cart.reduce(
          (total, item) => total + item.cantidad * item.precio,
          0,
        )
      },

      addProduct: (product: CartProduct) => {
        const { cart } = get()
        const inCart = cart.some((item) => item.id === product.id)

        if (!inCart) {
          set({ cart: [...cart, product] })
          return
        }

        const updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            if (item.limite_de_orden <= item.cantidad + product.cantidad) {
              return { ...item, cantidad: item.limite_de_orden }
            }
            return { ...item, cantidad: item.cantidad + product.cantidad }
          }
          return item
        })

        set({ cart: updatedCart })
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()
        const updatedCart = cart.map((item) =>
          item.id === product.id ? { ...item, cantidad: quantity } : item,
        )
        set({ cart: updatedCart })
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get()
        const newCart = cart.filter((item) => item.id !== product.id)
        set({ cart: newCart })
      },

      resetItems: () => {
        set({ cart: [] })
      },
    }),
    {
      name: 'cart',
      onRehydrateStorage: () => (state) => {
        if (state && typeof state.time === 'string') {
          state.time = new Date(state.time)
        }
      },
    },
  ),
)
