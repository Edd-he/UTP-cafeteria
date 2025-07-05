'use client'
import Link from 'next/link'
import { MdOutlineChevronLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { use, useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import _ from 'lodash'
import { z } from 'zod'

import { editUserSchema } from '@/modules/admin/schemas/users.schema'
import { FetchReniecDialog } from '@/modules/admin/users/fetch-reniec/fetch-reniec-dialog'
import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import { User } from '@/modules/shared/types'
import { useGetData } from '@/modules/shared/hooks/use-get-data'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/modules/shared/components/ui/card'
import { BACKEND_URL } from '@/lib/constants'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import ChangePasswordDialog from '@/modules/admin/users/change-password/change-pasword-dialog'
import { Switch } from '@/modules/shared/components/ui/switch'
import { extractAdminCode } from '@/lib/format-code'

type ReniecData = {
  nombre: string
  apellidos: string
}
type Props = {
  params: Promise<{ id: string }>
}

type editUserSchemaType = z.infer<typeof editUserSchema>

export default function Page({ params }: Props) {
  const { id } = use(params)
  const { push } = useRouter()

  //servicios
  const GET_USER_URL = `${BACKEND_URL}/usuarios/${id}/obtener-usuario`
  const UPDATE_USER_URL = `${BACKEND_URL}/usuarios/${id}/actualizar-usuario`

  const {
    data: user,
    loading: getLoading,
    error: getError,
  } = useGetData<User>(GET_USER_URL)
  const { sendRequest, loading } = useSendRequest(UPDATE_USER_URL, 'PATCH')

  const [reniecData, setReniecData] = useState<ReniecData>()
  const [open, setOpen] = useState(false)

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<editUserSchemaType>({
    resolver: zodResolver(editUserSchema),
  })

  const handleOpenChange = (newState: boolean) => {
    setOpen(newState)
  }

  const handleFetchReniec = (
    dni: string,
    nombre: string,
    apellidos: string,
  ) => {
    setValue('dni', dni)
    setReniecData({ nombre, apellidos })
  }

  if (getError) toast.error(getError)

  const onSubmit: SubmitHandler<editUserSchemaType> = async (data) => {
    if (user === null) {
      toast.warning('Error al obtener el usuario')
      return
    }
    if (_.isEqual(extractEditableFields(user), data)) {
      toast.warning('No se está actualizando nada en los datos del usuario')
      return
    }

    const { error } = await sendRequest(data)

    if (error) {
      toast.error(error)
      return
    }

    toast('Usuario Actualizado Correctamente')

    push('/admin/users')
  }

  useEffect(() => {
    if (user) {
      setReniecData({ nombre: user.nombre, apellidos: user.apellidos })
      reset(extractEditableFields(user))
    }
  }, [user, reset])
  const habilitado = watch('habilitado')
  return (
    <>
      <section className="max-w-screen-xl w-full mx-auto flex items-center justify-between gap-5 max-xs:flex-col">
        <div className="flex-center gap-5">
          <Button asChild variant={'outline'} size={'icon'}>
            <Link href={'/admin/users'}>
              <MdOutlineChevronLeft size={25} />
            </Link>
          </Button>

          <h1 className="text-3xl">Editar Usuario</h1>
        </div>
        <ChangePasswordDialog id={Number(id)} />
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
                <span className="p-2 border rounded text-sm">
                  {reniecData?.nombre}
                </span>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm">Apellidos</span>
                <span className="p-2 border rounded text-sm">
                  {reniecData?.apellidos}
                </span>
              </label>
            </CardContent>
          </Card>

          <Card className="max-w-screen-md">
            <CardHeader>
              <CardTitle className="text-xl font-normal">Contacto</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-5 max-md:flex-col">
              <label className="flex flex-col gap-2 w-full">
                <span className="text-sm">Correo Electrónico</span>
                <Input id="email" {...register('correo')} />
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
          <Button type="submit" disabled={getLoading || loading}>
            {getLoading || loading ? (
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
        open={open}
        handleFetchReniec={handleFetchReniec}
        handleOpenChange={handleOpenChange}
      />
    </>
  )
}

function extractEditableFields(user: User): editUserSchemaType {
  const { dni, correo, habilitado } = user
  return { dni, correo: extractAdminCode(correo) ?? '', habilitado }
}
