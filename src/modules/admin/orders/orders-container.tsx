/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { toast } from 'sonner'
import { useEffect, useOptimistic, useState } from 'react'

import { OrderCard } from './order-card'
import OrderChangeStatusDialog from './order-change-status-dialog'

import { useGetData } from '@/modules/shared/hooks/use-get-data'
import { BACKEND_URL } from '@/lib/constants'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'
import {
  Order,
  OrderStatus,
} from '@/modules/shared/interfaces/order.interfaces'
import OrdersSkeleton from '@/modules/shared/skelletons/orders-skeleton'

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
    refresh,
    error,
  } = useGetData<GetOrders>(
    `${BACKEND_URL}/ordenes/obtener-ordenes?page_size=${limit}&page=${page}&query=${query}&status=${status}`,
  )

  const { data: orders, updateData } = useSortableData<Order>()
  const [count, setCount] = useState(limit)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [optimisticOrders, setOptimisticOrder] = useOptimistic(
    orders,
    (current, updated: Order) =>
      current.map((o) => (o.id === updated.id ? updated : o)),
  )

  const handleOpenDialog = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedOrder(null)
  }

  const handleEstadoOptimista = (orden: Order, nuevoEstado: string) => {
    const actualizada = { ...orden, estado: nuevoEstado as OrderStatus }
    setOptimisticOrder(actualizada)
  }

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
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <OrdersSkeleton count={6} />
        </div>
      ) : fetch?.data !== undefined && fetch?.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {optimisticOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onChangeStatusClick={() => handleOpenDialog(order)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No se encontraron órdenes que coincidan con tu búsqueda.
        </div>
      )}
      <OrderChangeStatusDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        order={selectedOrder}
        refresh={refresh}
        updateOptimisticOrder={handleEstadoOptimista}
      />
    </>
  )
}
