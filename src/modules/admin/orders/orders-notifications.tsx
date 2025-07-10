'use client'
import { toast } from 'sonner'

import { useOrdersListener } from '../hooks/use-orders-listener'

export function OrdersNotifications() {
  useOrdersListener({
    onNewOrder: (data) => {
      toast.success('Se ha realizado una nueva orden', {
        description: <p className="text-xs">{data.timestamp}</p>,
      })
    },
  })

  return null
}
