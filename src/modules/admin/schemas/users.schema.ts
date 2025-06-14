import { z } from 'zod'

export const UserCreateSchema = z
  .object({
    dni: z
      .string()
      .length(8, { message: 'El DNI debe tener 8 caracteres númericos' })
      .regex(/^\d+$/, { message: 'El DNI debe contener solo números' }),
    correo: z.string().email({ message: 'Correo electronico inválido' }),
    contraseña: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmar_contraseña: z.string(),
    habilitado: z.boolean({
      required_error: 'El estado es obligatorio',
      invalid_type_error: 'El estado debe ser verdadero o falso',
    }),
  })
  .strict()
  .refine((data) => data.contraseña === data.confirmar_contraseña, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmar_contraseña'],
  })

export const UserEditSchema = z.object({
  dni: z
    .string()
    .length(8, { message: 'El DNI debe tener 8 caracteres númericos' })
    .regex(/^\d+$/, { message: 'El DNI debe contener solo números' }),
  correo: z.string().email({ message: 'Correo electronico inválido' }),
  habilitado: z.boolean({
    required_error: 'El estado es obligatorio',
    invalid_type_error: 'El estado debe ser verdadero o falso',
  }),
})
