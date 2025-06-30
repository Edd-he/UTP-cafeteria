'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changePasswordSchema } from '@/modules/admin/schemas/change-password.schema'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'

type Props = {
  id: number
}
type InputForm = {
  contraseña: string
  nueva_contraseña: string
}

export default function UserChangePasswordForm({ id }: Props) {
  const { sendRequest, loading } = useSendRequest(
    `/api/users/${id}/change-password`,
    'PATCH',
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputForm>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit: SubmitHandler<InputForm> = async (data) => {
    const { error } = await sendRequest(data)
    if (error) {
      toast.error(error)
      return
    }

    toast.success('Contraseña cambiada con éxito')
    reset()
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguridad</CardTitle>
        <CardDescription>Maneja la contraseña de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="current-password">Contraseña Actual</label>
            <Input
              id="current-password"
              type="password"
              placeholder="********"
              {...register('contraseña')}
            />
            {errors.contraseña && (
              <p className="text-red-600 text-xs">
                {errors.contraseña.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <label htmlFor="new-password">Nueva Contraseña</label>
            <Input
              id="new-password"
              type="password"
              placeholder="********"
              {...register('nueva_contraseña')}
            />

            {errors.nueva_contraseña && (
              <p className="text-red-600 text-xs">
                {errors.nueva_contraseña.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
