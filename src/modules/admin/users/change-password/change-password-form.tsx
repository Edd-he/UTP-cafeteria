'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { toast } from 'sonner'
import { z } from 'zod'

import { changePasswordSchema } from '../../schemas/change-password.schema'

import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { BACKEND_URL } from '@/lib/constants'

type Props = {
  id: number
  onSuccess: () => void
}

type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>

export default function ChangePasswordForm({ id, onSuccess }: Props) {
  const { sendRequest, loading } = useSendRequest(
    `${BACKEND_URL}/users/${id}/actualizar-contraseña`,
    'PATCH',
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit: SubmitHandler<ChangePasswordSchemaType> = async (data) => {
    const { error } = await sendRequest(data)
    if (error) {
      toast.error(error)
      return
    }

    toast.success('Contraseña cambiada con éxito')
    reset()
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="new-password">Nueva Contraseña</label>
        <Input
          id="new-password"
          type="password"
          {...register('nueva_contraseña')}
          placeholder="********"
        />
        {errors.nueva_contraseña && (
          <p className="text-red-600 text-xs">
            {errors.nueva_contraseña.message}
          </p>
        )}
      </div>
      <Button disabled={loading}>
        {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
      </Button>
    </form>
  )
}
