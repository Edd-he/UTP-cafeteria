export type Order = {
  id: number
  creado: string
  transaccion: string
  monto_total: string
  estado: OrderStatus
  Usuario: Usuario
  hora_programada: string
  Orden_Item: OrderItem[]
}

export type OrderItem = {
  id: number
  orden_id: number
  producto_id: number
  nombre_producto: string
  cantidad: number
  precio: number
}

type Usuario = {
  id: number
  dni: string
  nombre: string
  apellidos: string
  correo: string
  rol: string
}

export type PayOrder = {
  hora_programada: string
  monto_total: number
  orderItems: PayOrderItem[]
}

type PayOrderItem = {
  producto_id: number
  nombre_producto: string
  cantidad: number
  precio: number
}

export type OrderStatus =
  | 'RECOGER'
  | 'EN_PROCESO'
  | 'COMPLETADA'
  | 'ABANDONADA'
  | 'CANCELADA'
