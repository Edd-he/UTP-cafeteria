import { z } from 'zod'

import { PRODUCT_CATEGORIES } from '@/lib/categories'

const mapCategory = PRODUCT_CATEGORIES.map((category) => category.value)

export const productSchema = z.object({
  nombre: z
    .string({
      required_error: 'El nombre es obligatorio',
      invalid_type_error: 'El nombre debe ser un texto',
    })
    .min(3, { message: 'El nombre debe tener mínimo 3 caracteres' })
    .max(50, { message: 'El nombre debe tener como máximo 50 caracteres' }),

  descripcion: z
    .string({
      required_error: 'La descripción es obligatoria',
      invalid_type_error: 'La descripción debe ser un texto',
    })
    .min(3, { message: 'La descripción debe tener mínimo 3 caracteres' })
    .max(50, {
      message: 'La descripción debe tener como máximo 50 caracteres',
    }),

  habilitado: z.boolean({
    required_error: 'El estado es obligatorio',
    invalid_type_error: 'El estado debe ser verdadero o falso',
  }),

  precio: z.number().min(0, { message: 'El precio no puede ser negativo' }),

  categoria: z
    .string({
      required_error: 'Selecciona una categoría',
      invalid_type_error: 'La categoría debe ser un texto',
    })
    .refine((category) => mapCategory.includes(category), {
      message: 'La categoría no es válida',
    }),

  limite_de_orden: z
    .number({
      required_error: 'El límite de orden es obligatorio',
      invalid_type_error: 'El límite debe ser un número',
    })
    .min(1, { message: 'El límite no puede ser menor a 0' }),
  file: z
    .instanceof(File, { message: 'Debes seleccionar un archivo.' })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: 'El archivo debe ser menor a 5MB.',
    })
    .refine(
      (file) =>
        ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(
          file.type,
        ),
      {
        message: 'Solo se permiten imágenes JPEG, PNG o WEBP.',
      },
    )
    .optional(),
})
