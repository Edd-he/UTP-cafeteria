'use client'

import { useEffect } from 'react'
import Pusher from 'pusher-js'
import { toast } from 'sonner'

export function OrdersSocket() {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    })

    const channel = pusher.subscribe('orders-channel')

    channel.bind('new-order', (data: any) => {
      toast.success('Se ha realizado una nueva Orden', {
        description: <p className="text-xs">{data.timestamp}</p>,
      })
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [])

  return null
}
