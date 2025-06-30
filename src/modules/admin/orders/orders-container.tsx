/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

import { OrderCard } from './order-card'
import ChangeOrderStatusDialog from './change-order-status-dialog'

import { useGetData } from '@/modules/shared/hooks/use-get-data'
import { BACKEND_URL } from '@/lib/constants'
import { useSortableData } from '@/modules/shared/hooks/use-sort-data'
import { Order } from '@/modules/shared/types/order.interfaces'
import OrdersSkeleton from '@/modules/shared/skeletons/orders-skeleton'
import Pagination from '@/modules/shared/components/ui/pagination'

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
  const getUrl = `${BACKEND_URL}/ordenes/obtener-ordenes-hoy?page_size=${limit}&page=${page}&query=${query}&status=${status}`
  const { data: fetch, loading, refresh, error } = useGetData<GetOrders>(getUrl)

  const { data: orders, updateData } = useSortableData<Order>()
  const [count, setCount] = useState(limit)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedOrder(null)
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
      <Pagination totalPages={fetch?.totalPages ?? 1} />
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <OrdersSkeleton count={6} />
        </div>
      ) : fetch?.data !== undefined && fetch?.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order as Order}
              onChangeStatusClick={() => handleOpenDialog(order)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No se encontraron órdenes que coincidan con tu búsqueda.
        </div>
      )}
      <ChangeOrderStatusDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        order={selectedOrder}
        refresh={refresh}
      />
    </>
  )
}
