/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from 'next/link'
import { MdOutlineChevronLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { use, useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import _, { last } from 'lodash'

import { UserEditSchema } from '@/modules/admin/schemas/users.schema'
import UserChangePasswordDialog from '@/modules/admin/users/change-pasword-dialog'
import { DniQueryForm } from '@/modules/admin/users/fetch-dni-form'
import { FetchDniDialog } from '@/modules/admin/users/fetch-dni-dialog'
import { Button } from '@/modules/shared/components/ui/button'
import { Input } from '@/modules/shared/components/ui/input'
import { User, UserEditFormData } from '@/modules/shared/interfaces'
import { useGetData } from '@/modules/shared/hooks/use-get-data'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/modules/shared/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/shared/components/ui/select'
import { BACKEND_URL } from '@/lib/constants'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'

type ReniecData = {
  nombre: string
  apellidos: string
}
type Props = {
  params: Promise<{ id: string }>
}
export default function Page({ params }: Props) {
  const { id } = use(params)
  const { push } = useRouter()
  const [reniecData, setReniecData] = useState<ReniecData>()
  const [open, setOpen] = useState(false)
  const {
    data: user,
    loading: getLoading,
    error: getError,
  } = useGetData<User>(`${BACKEND_URL}/usuarios/${id}/obtener-usuario`)
  const { sendRequest, loading } = useSendRequest(
    `${BACKEND_URL}/usuarios/${id}/actualizar-usuario`,
    'PATCH',
  )

  const {
    register,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditFormData>({
    resolver: zodResolver(UserEditSchema),
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

  const onSubmit: SubmitHandler<UserEditFormData> = async (data) => {
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

  return (
    <>
      <section className="max-w-screen-xl w-full mx-auto flex items-center justify-start gap-5">
        <Button asChild variant={'outline'} size={'icon'}>
          <Link href={'/admin/users'}>
            <MdOutlineChevronLeft size={25} />
          </Link>
        </Button>
        <span className="flex-center gap-2 max-md:flex-col">
          <h1 className="text-3xl">Editar Usuario</h1>
          <UserChangePasswordDialog id={Number(id)} />
        </span>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-screen-xl w-full mx-auto max-lg:flex-col gap-5"
      >
        <div className="flex flex-col gap-5 w-full lg:w-[60%]">
          <Card className="max-w-72">
            <CardHeader>
              <CardTitle className="text-xl font-normal">Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                name="habilitado"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(value === '1')}
                    value={field.value ? '1' : '0'}
                  >
                    <SelectTrigger className="hover:bg-secondary">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      sideOffset={5}
                      hideWhenDetached
                    >
                      <SelectItem value="1">Activo</SelectItem>
                      <SelectItem value="0">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.habilitado && (
                <p className="text-red-600 text-xs">
                  {errors.habilitado.message}
                </p>
              )}
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
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl font-normal">
                Rol asignado
              </CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>

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
      <FetchDniDialog open={open} handleOpenChange={handleOpenChange}>
        <DniQueryForm
          handleOpenChange={handleOpenChange}
          handleFetchReniec={handleFetchReniec}
        />
      </FetchDniDialog>
    </>
  )
}

function extractEditableFields(user: User): UserEditFormData {
  const { id, creado, actualizado, nombre, apellidos, ...editable } = user
  return editable
}
