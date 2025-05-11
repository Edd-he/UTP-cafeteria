'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'

import { changeUserPassword } from '../server_actions/user-actions'

import { ChangePasswordSchema } from '@/Schemas/change-password-schema'

interface Props {
  id: number
  onSuccess: () => void
}

interface InputForm {
  password: string
  newPassword: string
}

export default function ChangePasswordForm({ id, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const onSubmit: SubmitHandler<InputForm> = async (data) => {
    setLoading(true)
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
