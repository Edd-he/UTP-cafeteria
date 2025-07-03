'use client'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { DateTime } from 'luxon'
import useSWR from 'swr'

import { MyOrderCard } from './my-order-card'
import { usePusherOrdersListener } from '../hooks/use-pusher-orders-listener'

import { BACKEND_URL } from '@/lib/constants'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'
import { Order } from '@/modules/shared/types/order.interfaces'
import OrdersSkeleton from '@/modules/shared/skeletons/orders-skeleton'
import { fetcher } from '@/lib/http/fetcher'

type Props = {
  query: string
  page: number
  limit: number
  access: string
  userId: number
}

type GetOrders = {
  data: Order[]
  total: number
  totalPages: number
}

export default function MyOrdersContainer({
  query,
  page,
  limit,
  access,
  userId,
}: Props) {
  const GET_URL = `${BACKEND_URL}/ordenes/obtener-ordenes-usuario?page_size=${limit}&page=${page}&query=${query}`

  const { data, isLoading, error, mutate } = useSWR<GetOrders>(
    access ? GET_URL : null,
    (url: string) => fetcher(url, access),
  )
  const { data: orders, updateData } = useSortableData<Order>()

  usePusherOrdersListener({
    userId: userId,
    onChange: () => {
      mutate()
    },
  })

  useEffect(() => {
    if (data) updateData(data.data)
  }, [data])

  const today = orders.filter((o) => isToday(o.hora_programada))
  const others = orders.filter((o) => !isToday(o.hora_programada))

  if (error) toast.error(error.message)
  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <OrdersSkeleton count={6} />
        </div>
      ) : data?.data && data.data.length > 0 ? (
        <>
          {today.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Órdenes de hoy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {today.map((order) => (
                  <MyOrderCard
                    isToday
                    key={order.id}
                    order={order}
                    refresh={mutate}
                  />
                ))}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Órdenes anteriores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((order) => (
                  <MyOrderCard
                    isToday={false}
                    key={order.id}
                    order={order}
                    refresh={mutate}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No se encontraron órdenes que coincidan con tu búsqueda.
        </div>
      )}
    </>
  )
}

function isToday(date?: string) {
  if (!date) return false

  const now = DateTime.fromFormat(date, 'dd-MM-yyyy HH:mm')

  if (!now.isValid) {
    return false
  }

  const today = DateTime.now()
  return (
    now.day === today.day &&
    now.month === today.month &&
    now.year === today.year
  )
}
