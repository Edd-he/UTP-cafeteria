import { z } from 'zod'

export const ChangePasswordSchema = z
  .object({
    contraseña: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    nueva_contraseña: z.string().min(8, {
      message: 'La nueva contraseña debe tener al menos 8 caracteres',
    }),
  })
  .strict()
  .refine((data) => data.contraseña !== data.nueva_contraseña, {
    message: 'La nueva contraseña no debe ser igual a la antigua',
    path: ['newPassword'],
  })
