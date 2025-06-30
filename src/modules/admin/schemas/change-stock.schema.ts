import { z } from 'zod'

const type = ['ENTRADA', 'SALIDA'] as const

export const changeStockSchema = z.object({
  producto_id: z
    .number({
      required_error: 'El ID del producto es obligatorio',
      invalid_type_error: 'El ID del producto debe ser un número',
    })
    .int('El ID del producto debe ser un número entero')
    .positive('El ID del producto debe ser mayor que cero'),

  tipo: z.enum(type, {
    errorMap: () => ({
      message: 'El tipo de movimiento no es válido. Debe ser ENTRADA o SALIDA',
    }),
  }),

  cantidad: z
    .number({
      required_error: 'La cantidad es obligatoria',
      invalid_type_error: 'La cantidad debe ser un número',
    })
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser mayor que cero'),
})
