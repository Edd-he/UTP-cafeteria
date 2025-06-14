import { Timer, User, DollarSign } from 'lucide-react'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/modules/shared/components/ui/card'
import { Badge } from '@/modules/shared/components/ui/badge'
import { Order, OrderStatus } from '@/modules/shared/interfaces'

export function OrderCard({ order }: { order: Order }) {
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
          <div className="flex items-center gap-2 text-sm">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <span>{order.hora_programada.split(' ')[1]}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>
              {(
                order.Usuario.nombre +
                ' ' +
                order.Usuario.apellidos
              ).toLowerCase()}
            </span>
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
      <CardFooter>
        <div className="flex items-center gap-2 font-bold">
          <DollarSign className="h-4 w-4" />
          <span>Total: S/{order.monto_total}</span>
        </div>
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
