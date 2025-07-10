/* eslint-disable no-unused-vars */
'use client'

import { useEffect } from 'react'
import Pusher from 'pusher-js'

type OrderStatusData = {
  id: number
  estado: string
  timestamp: string
}

type Props = {
  userId?: number
  onChange?: (data: OrderStatusData) => void
}

export function useMyOrdersListener({ userId, onChange }: Props) {
  useEffect(() => {
    if (!userId) return

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    })

    const channel = pusher.subscribe(`user-channel-${userId}`)

    const handler = (data: OrderStatusData) => {
      if (onChange) onChange(data)
    }

    channel.bind('order:new-status', handler)

    return () => {
      channel.unbind('order:new-status', handler)
      channel.unsubscribe()
      pusher.disconnect()
    }
  }, [userId, onChange])
}
