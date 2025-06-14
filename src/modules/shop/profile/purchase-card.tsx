import { Badge } from '@shared/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'

import { Order } from '@/modules/shared/interfaces'

type Props = {
  order: Order
}
export function OrderClientCard({ order }: Props) {
  const { id, monto_total, hora_programada, estado, creado, transaccion } =
    order
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-normal">ORD-00{id}</span>
          </div>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          <p>Transacción:</p>
          <p className="text-black font-semibold">
            <>{transaccion}</>
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <p className="text-xl">S/{monto_total}</p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Orden creada: {creado}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Hora Programada:{' '}
          <span className="text-black font-semibold">
            {hora_programada.split(' ')[1]}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <Badge
          variant={
            estado === 'COMPLETADA'
              ? 'default'
              : estado === 'CANCELADA'
                ? 'secondary'
                : 'destructive'
          }
        >
          {estado === 'COMPLETADA'
            ? 'Completada'
            : estado === 'EN_PROCESO'
              ? 'En proceso'
              : estado === 'RECOGER'
                ? 'Listo para recoger'
                : estado === 'ABANDONADA'
                  ? 'Abandonada'
                  : 'cancelada'}
        </Badge>
      </CardFooter>
    </Card>
  )
}
