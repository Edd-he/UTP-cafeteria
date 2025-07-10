/* eslint-disable no-unused-vars */
'use client'
import Pusher from 'pusher-js'
import { useEffect } from 'react'

type Payload = {
  id: number
  timestamp: string
}

type Props = {
  onNewOrder?: (data: Payload) => void
  onCancelledOrder?: (data: Payload) => void
}

export function useOrdersListener({ onNewOrder, onCancelledOrder }: Props) {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    })

    const channel = pusher.subscribe('orders-channel')

    if (onNewOrder) {
      channel.bind('order:new', onNewOrder)
    }

    if (onCancelledOrder) {
      channel.bind('order:cancelled', onCancelledOrder)
    }

    return () => {
      if (onNewOrder) channel.unbind('order:new', onNewOrder)
      if (onCancelledOrder) channel.unbind('order:cancelled', onCancelledOrder)
      channel.unsubscribe()
      pusher.disconnect()
    }
  }, [onNewOrder, onCancelledOrder])
}
