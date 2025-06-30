export type ProductInventory = {
  id: number
  producto_id: number
  fecha: string
  stock_inicial: number
  stock: number
  ultima_salida: string | null
  ultima_entrada: string | null
  nombre_producto: string
}
