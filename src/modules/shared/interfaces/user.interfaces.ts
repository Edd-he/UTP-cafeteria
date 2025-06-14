export type User = {
  id: string
  creado: string
  actualizado: string
  dni: string
  nombre: string
  apellidos: string
  correo: string
  rol: string
  habilitado: boolean
}

export type UserFormData = {
  dni: string
  correo: string
  habilitado: boolean
  contraseña: string
  confirmar_contraseña?: string
}

export type UserEditFormData = {
  dni?: string
  correo?: string
  habilitado?: boolean
}
