'use client'

import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { useMyOrdersListener } from '../hooks/use-my-orders-listener'

export function MyOrdersNotification() {
  const { data: session } = useSession()

  useMyOrdersListener({
    userId: session?.user.id,
    onChange: (data) => {
      toast.success(`Tu orden ${data.id} pasó al estado ${data.estado}`, {
        description: <p className="text-xs">{data.timestamp}</p>,
      })
    },
  })

  return null
}
