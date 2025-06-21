'use client'
import Link from 'next/link'
import { MdOutlineChevronLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiOutlineLoading } from 'react-icons/ai'
import { Textarea } from '@shared/components/ui/textarea'
import { Input } from '@shared/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@shared/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select'
import { Button } from '@shared/components/ui/button'

import {
  productCreateSchema,
  ProductSchema,
} from '@/modules/admin/schemas/products.schema'
import { PRODUCT_CATEGORIRES } from '@/lib/categories'
import { BACKEND_URL } from '@/lib/constants'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import ImageUploader from '@/modules/shared/components/image-uploader'

export default function Page() {
  const { sendRequest, loading } = useSendRequest(
    `${BACKEND_URL}/productos/crear-producto`,
    'POST',
    '',
    true,
  )
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<productCreateSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoria: '',
      limite_de_orden: 0,
      habilitado: true,
    },
  })

  const { push } = useRouter()

  const onSubmit: SubmitHandler<productCreateSchema> = async (data) => {
    const form = new FormData()
    form.append('nombre', data.nombre)
    form.append('descripcion', data.descripcion)
    form.append('habilitado', data.habilitado.toString())
    form.append('precio', data.precio.toString())
    form.append('categoria', data.categoria)
    form.append('limite_de_orden', data.limite_de_orden.toString())
    if (data.file) {
      form.append('file', data.file)
    }
    const { error } = await sendRequest(form)

    if (error) {
      toast.error(error)
      return
    }
    toast.success('Producto Creado Correctamente')
    push('/admin/products')
  }

  return (
    <>
      <section className="max-w-screen-xl w-full mx-auto flex items-center justify-start  gap-5">
        <Button asChild variant={'outline'} size={'icon'}>
          <Link href={'/admin/products'}>
            <MdOutlineChevronLeft size={25} />
          </Link>
        </Button>

        <h1 className="text-3xl">Nuevo Producto</h1>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-screen-xl max-lg:flex-col w-full mx-auto gap-5"
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
            <CardHeader>
              <CardTitle className="text-xl font-normal">Detalles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <label className="flex flex-col gap-2">
                <span>Nombre</span>
                <Input id="name" {...register('nombre')} />
                {errors.nombre && (
                  <p className="text-red-600 text-xs">
                    {errors.nombre.message}
                  </p>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span>Descripción</span>
                <Textarea id="description" {...register('descripcion')} />
                {errors.descripcion && (
                  <p className="text-red-600 text-xs ">
                    {errors.descripcion.message}
                  </p>
                )}
              </label>
            </CardContent>
          </Card>
          <div className="flex max-md:flex-col w-full gap-5">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Precio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <label className="flex flex-col gap-2">
                  <Input
                    type="number"
                    defaultValue={0}
                    min={0}
                    step={0.01}
                    id="precio"
                    {...register('precio', { valueAsNumber: true })}
                  />
                </label>
                {errors.precio && (
                  <p className="text-red-600 text-xs">
                    {errors.precio.message}
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Categoria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Controller
                  name="categoria"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ''}
                    >
                      <SelectTrigger className="hover:bg-secondary">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent position="popper" hideWhenDetached>
                        {PRODUCT_CATEGORIRES.map((category, index) => (
                          <SelectItem key={index} value={`${category.value}`}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoria && (
                  <p className="text-red-600 text-xs">
                    {errors.categoria.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-5 max-md:flex-col w-full"></div>
        </div>
        <div className="w-full lg:w-[40%] relative flex flex-col gap-5">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl font-normal">
                Compra Limite
              </CardTitle>
              <CardDescription>
                Cantidad máxima que el cliente podra adquirir por compra.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <label className="flex flex-col gap-2">
                <Input
                  type="number"
                  defaultValue={0}
                  min={0}
                  id="limite_de_orden"
                  {...register('limite_de_orden', { valueAsNumber: true })}
                />
              </label>
              {errors.limite_de_orden && (
                <p className="text-red-600 text-xs">
                  {errors.limite_de_orden.message}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="w-full h-auto relative">
            <CardHeader>
              <CardTitle className="text-xl font-normal">Imagen</CardTitle>
              <CardDescription>
                Arrastra las imágenes en el contenedor o haz clic para
                seleccionar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                    defaultImage={''}
                  />
                )}
              />
            </CardContent>
            {errors.file && (
              <p className="text-red-600 text-xs">
                {errors.file.message?.toString()}
              </p>
            )}
          </Card>
          <Button disabled={loading}>
            {loading ? (
              <AiOutlineLoading
                size={18}
                className="animate-spin ease-in-out"
              />
            ) : (
              <>Guardar Producto</>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}
