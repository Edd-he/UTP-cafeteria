'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { toast } from 'sonner'

import { ChangePasswordSchema } from '../schemas/change-password-schema'

import { usePostData } from '@/modules/shared/hooks/use-post-data'

type Props = {
  id: number
  onSuccess: () => void
}

type InputForm = {
  password: string
  newPassword: string
}

export default function ChangePasswordForm({ id, onSuccess }: Props) {
  const { postData, error, loading } = usePostData(
    `/api/users/${id}/change-password`,
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputForm>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const onSubmit: SubmitHandler<InputForm> = async (data) => {
    await postData(data)
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
        <label htmlFor="current-password">Contraseña Actual</label>
        <Input
          id="current-password"
          type="password"
          {...register('password')}
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-600 text-xs">{errors.password.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <label htmlFor="new-password">Nueva Contraseña</label>
        <Input
          id="new-password"
          type="password"
          {...register('newPassword')}
          placeholder="********"
        />
        {errors.newPassword && (
          <p className="text-red-600 text-xs">{errors.newPassword.message}</p>
        )}
      </div>
      <Button disabled={loading}>
        {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
      </Button>
    </form>
  )
}
