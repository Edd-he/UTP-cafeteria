import { z } from 'zod'

const billingSchema = z.object({
  celular: z
    .string()
    .length(9, 'El número de celular debe tener 9 dígitos')
    .regex(/^9\d{8}$/, 'El número debe empezar con 9 y tener 9 dígitos'),
})

export type BilleteraData = z.infer<typeof billingSchema>

export const validarBilletera = billingSchema

export const metodoPagoSchema = z.enum(['YAPE', 'PLIN'])
