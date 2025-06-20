/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client'
import { useState, useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import { LoginSchema } from '@/modules/auth/schemas/login-schema'

type LoginForm = {
  correo: string
  contraseña: string
}
export default function Page() {
  const { data: session } = useSession()
  const userRole = session?.user?.rol
  const [loading, setLoading] = useState(false)
  const {
    register,
    reset,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  })
  const { push, prefetch } = useRouter()

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setLoading(true)
    try {
      const response = await signIn('credentials', {
        email: data.correo,
        password: data.contraseña,
        redirect: false,
      })
      if (!response?.ok) {
        throw {
          message: response?.error || 'Error en la solicitud',
        }
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      const errorMessage = error.message

      toast.error(errorMessage)
    }
  }
  useEffect(() => {
    prefetch('/shop')
    prefetch('/admin/orders')
  }, [])

  useEffect(() => {
    if (session?.user?.rol) {
      const rol = session.user.rol
      if (rol === 'ADMINISTRADOR') {
        push('/admin/orders')
        return
      }
      push('/shop')
    }
  }, [session, push])
  return (
    <>
      <div className="w-full max-w-md px-5">
        <p className="text-xl mb-10 font-semibold">
          Rápido, fácil, a tu manera — pide desde la web app.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full items-center gap-6 text-sm font-semibold"
        >
          <p className="font-normal">
            Ingresa tus datos para
            <span className="font-semibold"> iniciar sesión</span>
          </p>
          <label className="flex flex-col gap-2">
            <span>Código UTP:</span>
            <Input id="email" className="font-normal" {...register('correo')} />
            <span className="text-xs font-normal">
              Ejemplo de usuario: U1533148 (no digitar el @utp.edu.pe)
            </span>
            {errors.correo && (
              <p className="text-red-600 text-xs">{errors.correo.message}</p>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span>Contraseña:</span>
            <Input
              id="password"
              type="password"
              className="font-normal"
              {...register('contraseña')}
            />
            {errors.contraseña && (
              <p className="text-red-600 text-xs">
                {errors.contraseña.message}
              </p>
            )}
          </label>
          <Button disabled={loading} className=" w-full">
            {loading ? (
              <AiOutlineLoading
                size={18}
                className="animate-spin ease-in-out"
              />
            ) : (
              <>Iniciar Sesión</>
            )}
          </Button>
        </form>
      </div>
    </>
  )
}
