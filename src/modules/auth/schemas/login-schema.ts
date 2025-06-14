import { z } from 'zod'

export const LoginSchema = z.object({
  correo: z.string().email({ message: 'Correo Electrónico inválido' }),
  contraseña: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
})
