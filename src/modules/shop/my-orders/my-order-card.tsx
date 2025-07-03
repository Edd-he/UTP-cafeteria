import { Timer, DollarSign, Calendar } from 'lucide-react'

import CancelOrderDialog from './cancel-order-dialog'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/modules/shared/components/ui/card'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Order, OrderStatus } from '@/modules/shared/types'

type Props = {
  order: Order
  isToday: boolean
  refresh?: () => void
}
export function MyOrderCard({ order, isToday, refresh }: Props) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="font-bold text-lg">ORD-00{order.id}</div>
          <StatusBadge status={order.estado} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div
            className={`flex items-start gap-2 text-sm ${
              isToday ? 'flex-row items-center' : 'flex-col'
            }`}
          >
            {isToday ? (
              <>
                <Timer className="size-4 text-muted-foreground" />
                <span>{order.hora_programada.split(' ')[1]}</span>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span>{order.hora_programada.split(' ')[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Timer className="size-4 text-muted-foreground" />
                  <span>{order.hora_programada.split(' ')[1]}</span>
                </div>
              </>
            )}
          </div>
          <div className="mt-2">
            <div className="text-sm font-medium">Productos:</div>
            <ul className="text-sm pl-5 list-disc">
              {order.Orden_Item.map((item, index) => (
                <li key={index}>
                  {item.nombre_producto} x{item.cantidad} (S/{item.precio})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold">
          <DollarSign className="size-4" />
          <span>Total: S/{order.monto_total}</span>
        </div>
        {order.estado === 'ABANDONADA' ||
        order.estado === 'CANCELADA' ||
        order.estado === 'COMPLETADA' ? (
          <></>
        ) : (
          <CancelOrderDialog order={order} onSuccess={refresh} />
        )}
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig = {
    EN_PROCESO: {
      label: 'En Proceso',
      className: 'bg-blue-500 hover:bg-blue-600',
    },
    RECOGER: {
      label: 'Para recoger',
      className: 'bg-yellow-500 hover:bg-yellow-600',
    },
    COMPLETADA: {
      label: 'Completada',
      className: 'bg-green-500 hover:bg-green-600',
    },
    ABANDONADA: {
      label: 'Abandonada',
      className: 'bg-red-500 hover:bg-red-600',
    },
    CANCELADA: { label: 'Cancelada', className: 'bg-red-500 hover:bg-red-600' },
  }

  const config = statusConfig[status]

  return (
    <Badge className={`${config.className} text-white`}>{config.label}</Badge>
  )
}
