import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    nueva_contraseña: z.string().min(8, {
      message: 'La nueva contraseña debe tener al menos 8 caracteres',
    }),
  })
  .strict()
