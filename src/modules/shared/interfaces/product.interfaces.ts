export type Product = {
  id: number
  creado: string
  actualizado: string
  nombre: string
  descripcion: string
  precio: string
  categoria: string
  habilitado: boolean
  stock: number
  limite_de_orden: number
  url: any
}

export type CartProduct = {
  id: number
  nombre: string
  descripcion: string
  precio: number
  limite_de_orden: number
  cantidad: number
  category: string
  url: any
}

export type ProductFormData = {
  nombre: string
  descripcion: string
  habilitado: boolean
  categoria: string
  precio: number
  limite_de_orden: number
}
