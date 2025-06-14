/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

import { OrderCard } from './order-card'

import { useGetData } from '@/modules/shared/hooks/use-get-data'
import { BACKEND_URL } from '@/lib/constants'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'
import { Order } from '@/modules/shared/interfaces/order.interfaces'

type Props = {
  query: string
  page: number
  limit: number
  status: string
}

type GetOrders = {
  data: Order[]
  total: number
  totalPages: number
}
export default function OrdersContainer({ query, page, limit, status }: Props) {
  const {
    data: fetch,
    loading,
    error,
  } = useGetData<GetOrders>(
    `${BACKEND_URL}/ordenes/obtener-ordenes?page_size=${limit}&page=${page}&query=${query}&status=${status}`,
  )

  const { data: orders, updateData } = useSortableData<Order>()
  const [count, setCount] = useState(limit)

  useEffect(() => {
    if (fetch) {
      updateData(fetch.data)
      setCount(fetch.total)
    }
  }, [fetch])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order as Order} />
        ))}
      </div>
      {orders.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          No se encontraron órdenes que coincidan con tu búsqueda.
        </div>
      )}
    </>
  )
}
