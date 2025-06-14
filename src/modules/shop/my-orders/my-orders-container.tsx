'use client'
import { toast } from 'sonner'
import { useEffect } from 'react'

import { MyOrderCard } from './my-order-card'

import { useGetData } from '@/modules/shared/hooks/use-get-data'
import { BACKEND_URL } from '@/lib/constants'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'
import { Order } from '@/modules/shared/interfaces/order.interfaces'

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
  const { data: fetch, error } = useGetData<GetOrders>(
    `${BACKEND_URL}/ordenes/obtener-ordenes-usuario?page_size=${limit}&page=${page}&query=${query}`,
    access,
  )

  const { data: orders, updateData } = useSortableData<Order>()

  useEffect(() => {
    if (fetch) {
      updateData(fetch.data)
    }
  }, [fetch])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <MyOrderCard key={order.id} order={order as Order} />
        ))}
      </div>
      {orders.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No tienes Ordenes
        </div>
      )}
    </>
  )
}
