'use client'
import Link from 'next/link'
import { MdOutlineChevronLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { Input } from '@shared/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import { z } from 'zod'

import { createUserSchema } from '@/modules/admin/schemas/users.schema'
import { FetchReniecDialog } from '@/modules/admin/users/fetch-reniec/fetch-reniec-dialog'
import { BACKEND_URL } from '@/lib/constants'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { Switch } from '@/modules/shared/components/ui/switch'

type ReniecData = {
  nombre: string
  apellidos: string
}

type CreateUserSchemaType = z.infer<typeof createUserSchema>

export default function Page() {
  const POST_URL = `${BACKEND_URL}/usuarios/crear-administrador`
  const { sendRequest, loading } = useSendRequest(POST_URL, 'POST')

  const [reniecData, setReniecData] = useState<ReniecData>()
  const [open, setOpen] = useState(false)

  const { push } = useRouter()

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
  })

  const handleOpenChange = (newState: boolean) => {
    setOpen(newState)
  }

  const handleFetchReniec = (
    dni: string,
    nombre: string,
    apellidos: string,
  ) => {
    setReniecData({ nombre, apellidos })
    setValue('dni', dni)
  }

  const onSubmit: SubmitHandler<CreateUserSchemaType> = async (data) => {
    const { error } = await sendRequest(data)

    if (error) {
      toast.error(error)
      return
    }
    toast.success('Usuario Creado Correctamente')
    push('/admin/users')
  }

  const habilitado = watch('habilitado')

  return (
    <>
      <section className="max-w-screen-xl w-full mx-auto flex items-center justify-start gap-5">
        <Button asChild variant={'outline'} size={'icon'}>
          <Link href={'/admin/users'}>
            <MdOutlineChevronLeft size={25} />
          </Link>
        </Button>

        <h1 className="text-3xl">Nuevo Usuario</h1>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-screen-xl w-full mx-auto max-lg:flex-col gap-5"
      >
        <div className="flex flex-col gap-5 w-full lg:w-[60%]">
          <Card className="flex-row items-center justify-between p-4">
            <div className="space-y-0.5">
              <label className="text-lg">Estado</label>
              <p className="text-sm text-gray-500">
                Verifica si el producto estará habilitado
              </p>
            </div>
            <CardContent>
              <Switch
                checked={habilitado}
                onCheckedChange={(value) => setValue('habilitado', value)}
              />
            </CardContent>
          </Card>

          <Card className="max-w-screen-md">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-xl font-normal">Detalles</CardTitle>
              <Button
                variant={'outline'}
                type="button"
                onClick={() => handleOpenChange(true)}
              >
                Consultar RENIEC
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex flex-col gap-2">
                <span className="text-sm">DNI</span>
                <Input id="dni" {...register('dni')} />
                {errors.dni && (
                  <p className="text-red-600 text-xs">{errors.dni.message}</p>
                )}
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm">Nombres</span>
                <Input id="nombre" defaultValue={reniecData?.nombre} readOnly />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm">Apellidos</span>
                <Input
                  id="lastName"
                  defaultValue={reniecData?.apellidos}
                  readOnly
                />
              </label>
            </CardContent>
          </Card>

          <Card className="max-w-screen-md">
            <CardHeader>
              <CardTitle>Código</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-5 max-md:flex-col">
              <label className="flex flex-col gap-2 w-full">
                <Input id="correo" {...register('correo')} />
                {errors.correo && (
                  <p className="text-red-600 text-xs">
                    {errors.correo.message}
                  </p>
                )}
              </label>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-[40%] relative flex flex-col gap-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-normal">Contraseña</CardTitle>
              <CardDescription>Minimo 8 carácteres</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <label className="flex flex-col gap-2 w-full">
                <span className="text-sm">Contraseña</span>
                <Input id="password" {...register('contraseña')} />
                {errors.contraseña && (
                  <p className="text-red-600 text-xs">
                    {errors.contraseña.message}
                  </p>
                )}
              </label>

              <label className="flex flex-col gap-2 w-full">
                <span className="text-sm">Confirmar Contraseña</span>
                <Input
                  id="confirmPassword"
                  {...register('confirmar_contraseña')}
                />
                {errors.confirmar_contraseña && (
                  <p className="text-red-600 text-xs">
                    {errors.confirmar_contraseña.message}
                  </p>
                )}
              </label>
            </CardContent>
          </Card>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <AiOutlineLoading
                size={18}
                className="animate-spin ease-in-out"
              />
            ) : (
              <>Guardar Usuario</>
            )}
          </Button>
        </div>
      </form>
      <FetchReniecDialog
        handleFetchReniec={handleFetchReniec}
        handleOpenChange={handleOpenChange}
        open={open}
      />
    </>
  )
}
