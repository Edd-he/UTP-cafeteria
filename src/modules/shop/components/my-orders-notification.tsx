'use client'

import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { usePusherOrdersListener } from '../hooks/use-pusher-orders-listener'

export function MyOrdersNotification() {
  const { data: session } = useSession()

  usePusherOrdersListener({
    userId: session?.user.id,
    onChange: (data) => {
      toast.success(`Tu orden ${data.id} pasó al estado ${data.estado}`, {
        description: <p className="text-xs">{data.timestamp}</p>,
      })
    },
  })

  return null
}
