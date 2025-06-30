import { z } from 'zod'

export const baseUserSchema = z.object({
  dni: z
    .string()
    .length(8, { message: 'El DNI debe tener 8 caracteres númericos' })
    .regex(/^\d+$/, { message: 'El DNI debe contener solo números' }),
  correo: z
    .string()
    .length(9, { message: 'El código debe tener 9 caracteres' })
    .regex(/^[Aa]\d{8}$/, {
      message: 'El código debe empezar con A seguido de 8 dígitos',
    })
    .transform((value) => {
      const cod = value.toUpperCase()
      return `${cod}@utp.edu.pe`
    })
    .pipe(z.string().email({ message: 'Código inválido' })),
  contraseña: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  confirmar_contraseña: z.string(),
  habilitado: z.boolean({
    required_error: 'El estado es obligatorio',
    invalid_type_error: 'El estado debe ser verdadero o falso',
  }),
})

export const createUserSchema = baseUserSchema.refine(
  (data) => data.contraseña === data.confirmar_contraseña,
  {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  },
)

export const editUserSchema = baseUserSchema.omit({
  contraseña: true,
  confirmar_contraseña: true,
})
