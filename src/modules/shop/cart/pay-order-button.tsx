'use client'

import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button } from '@/modules/shared/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { BACKEND_URL } from '@/lib/constants'
import { PayOrder } from '@/modules/shared/interfaces'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}
export default function PayOrderButton({ className }: Props) {
  const { push } = useRouter()
  const { data: session } = useSession()

  const cart = useCartStore((state) => state.cart)
  const time = useCartStore((state) => state.time)
  const total = useCartStore((state) => state.getFinalPrice)
  const reset = useCartStore((state) => state.resetItems)
  const isTimeValid = useCartStore((state) => state.isTimeValid)

  const { access } = session?.tokens ?? {}

  const { sendRequest, loading } = useSendRequest(
    `${BACKEND_URL}/ordenes/crear-orden`,
    'POST',
    access,
  )

  if (!session || cart.length === 0) return null

  const handlePayOrder = async () => {
    if (!isTimeValid()) {
      toast.error('La hora programada no es válida')
      return
    }

    const pay: PayOrder = {
      hora_programada: time.toISOString(),
      monto_total: total(),
      orderItems: cart.map((item) => ({
        producto_id: item.id,
        cantidad: item.cantidad,
        nombre_producto: item.nombre,
        precio: item.precio,
      })),
    }
    const { error } = await sendRequest(pay)

    if (error) {
      toast.error(error)
      return
    }

    reset()
    push('/shop/checkout-confirm')
  }

  return (
    <Button
      className={cn(className)}
      onClick={handlePayOrder}
      disabled={loading || !isTimeValid()}
    >
      {loading ? 'Procesando...' : 'Realizar Orden'}
    </Button>
  )
}
