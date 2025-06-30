export type Payment = {
  id: number
  transaccion: string
  creado: string
  monto_total: number
  codigo: string
  metodo_pago: Payment_Method
}

export type Payment_Method = 'YAPE' | 'PLIN' | 'TARJETA'
