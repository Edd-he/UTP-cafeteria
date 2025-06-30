import { z } from 'zod'

export const loginSchema = z.object({
  correo: z
    .string()
    .length(9, { message: 'Código inválido' })
    .regex(/^[UuAa]\d{8}$/, {
      message: 'Código inválido',
    })
    .transform((value) => {
      const cod = value.toUpperCase()
      return `${cod}@utp.edu.pe`
    })
    .pipe(z.string().email({ message: 'Código inválido' })),

  contraseña: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
})
