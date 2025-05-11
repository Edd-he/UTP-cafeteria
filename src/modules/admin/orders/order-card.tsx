import { Calendar, User, DollarSign } from 'lucide-react'

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/modules/shared/components/ui/card'
import { Badge } from '@/modules/shared/components/ui/badge'

export type OrderStatus =
  | 'pendiente'
  | 'en-proceso'
  | 'completada'
  | 'cancelada'

export type OrderItem = {
  name: string
  quantity: number
  price: number
}

export type Order = {
  id: string
  date: string
  customer: string
  items: OrderItem[]
  total: number
  status: OrderStatus
}

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="font-bold text-lg">{order.id}</div>
          <StatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{order.customer}</span>
          </div>
          <div className="mt-2">
            <div className="text-sm font-medium">Productos:</div>
            <ul className="text-sm pl-5 list-disc">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} x{item.quantity} (${item.price.toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 font-bold">
          <DollarSign className="h-4 w-4" />
          <span>Total: ${order.total.toFixed(2)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const statusConfig = {
    pendiente: {
      label: 'Pendiente',
      className: 'bg-yellow-500 hover:bg-yellow-600',
    },
    'en-proceso': {
      label: 'En Proceso',
      className: 'bg-blue-500 hover:bg-blue-600',
    },
    completada: {
      label: 'Completada',
      className: 'bg-green-500 hover:bg-green-600',
    },
    cancelada: { label: 'Cancelada', className: 'bg-red-500 hover:bg-red-600' },
  }

  const config = statusConfig[status]

  return (
    <Badge className={`${config.className} text-white`}>{config.label}</Badge>
  )
}
