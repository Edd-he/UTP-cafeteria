'use client'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { DateTime } from 'luxon'

import { MyOrderCard } from './my-order-card'

import { useGetData } from '@/modules/shared/hooks/use-get-data'
import { BACKEND_URL } from '@/lib/constants'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'
import { Order } from '@/modules/shared/interfaces/order.interfaces'
import OrdersSkeleton from '@/modules/shared/skelletons/orders-skeleton'

type Props = {
  query: string
  page: number
  limit: number
  access: string
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
}: Props) {
  const {
    data: fetch,
    loading,
    error,
  } = useGetData<GetOrders>(
    `${BACKEND_URL}/ordenes/obtener-ordenes-usuario?page_size=${limit}&page=${page}&query=${query}`,
    access,
  )

  const { data: orders, updateData } = useSortableData<Order>()

  useEffect(() => {
    if (fetch) updateData(fetch.data)
  }, [fetch])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  function isToday(date?: string) {
    if (!date) return false

    const now = DateTime.fromFormat(date, 'dd-MM-yyyy HH:mm')

    if (!now.isValid) {
      console.warn('Fecha inválida:', date)
      return false
    }

    const today = DateTime.now()
    return (
      now.day === today.day &&
      now.month === today.month &&
      now.year === today.year
    )
  }

  const today = orders.filter((o) => isToday(o.hora_programada))
  const others = orders.filter((o) => !isToday(o.hora_programada))

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <OrdersSkeleton count={6} />
        </div>
      ) : fetch?.data && fetch.data.length > 0 ? (
        <>
          {today.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Órdenes de hoy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {today.map((order) => (
                  <MyOrderCard key={order.id} order={order} />
                ))}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-2">Órdenes anteriores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((order) => (
                  <MyOrderCard key={order.id} order={order} />
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
