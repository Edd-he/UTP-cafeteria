'use client'
import Link from 'next/link'
import { MdOutlineChevronLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { Textarea } from '@shared/components/ui/textarea'
import { Input } from '@shared/components/ui/input'
import { ProductSchema } from '@admin/schemas/product-schema'
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
import { ProductFormData } from '@shared/interfaces'
import ImageUploader from '@shared/components/image-uploader'

import { CATEGORIES } from '@/lib/categories'
import { convertToBase64 } from '@/lib/utils'
import { useGetData } from '@/modules/shared/hooks/use-get-data'
import { usePutData } from '@/modules/shared/hooks/user-put-data'

type Props = {
  params: Promise<{ id: string }>
}
export default async function Page({ params }: Props) {
  const { id } = await params
  const { push } = useRouter()
  const {
    data,
    error: getError,
    loading: getLoading,
  } = useGetData<ProductFormData>(`/api/products/${id}`)
  const {
    putData,
    error: putError,
    loading: putLoading,
  } = usePutData(`/api/products/${id}`)
  const [product, setProduct] = useState<ProductFormData>()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
  })

  if (data !== null) {
    setProduct(data)
    reset(data)
  }

  if (getError) toast.error(getError)

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    let image = 'PENDIENTE'

    if (
      data.img &&
      data.img !== null &&
      data.img !== undefined &&
      data.img !== 'PENDIENTE'
    )
      image = await convertToBase64(data.img)

    const formData = { ...data, img: image }

    if (_.isEqual(product, data)) {
      toast.warning('No se está actualizando nada en los datos del producto')
      return
    }

    await putData(formData)

    if (putError) {
      toast.error(getError)
      return
    }

    toast('Producto Actualizado Correctamente')

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

        <h1 className="text-3xl">Editar Producto {id}</h1>
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
                name="status"
                control={control}
                defaultValue="1"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="hover:bg-secondary">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent position="popper" hideWhenDetached>
                      <SelectItem value="1">Activo</SelectItem>
                      <SelectItem value="0">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-red-600 text-xs">{errors.status.message}</p>
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
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-red-600 text-xs">{errors.name.message}</p>
                )}
              </label>

              <label className="flex flex-col gap-2">
                <span>Descripción</span>
                <Textarea id="description" {...register('description')} />
                {errors.description && (
                  <p className="text-red-600 text-xs ">
                    {errors.description.message}
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
                    id="price"
                    {...register('price')}
                  />
                </label>
                {errors.price && (
                  <p className="text-red-600 text-xs">{errors.price.message}</p>
                )}
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Categoria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="hover:bg-secondary">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent position="popper" hideWhenDetached>
                        {CATEGORIES.map((category, index) => (
                          <SelectItem key={index} value={`${category.slug}`}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-red-600 text-xs">
                    {errors.category.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-5 max-md:flex-col w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl font-normal">Descuento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <label className="flex flex-col gap-2">
                  <Input
                    type="number"
                    defaultValue={0}
                    step={0.01}
                    min={0}
                    id="discount"
                    {...register('discount')}
                  />
                </label>
                {errors.discount && (
                  <p className="text-red-600 text-xs">
                    {errors.discount.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
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
                  id="orderLimit"
                  {...register('orderLimit')}
                />
              </label>
              {errors.orderLimit && (
                <p className="text-red-600 text-xs">
                  {errors.orderLimit.message}
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
                name="img"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                    defaultImage={product?.img}
                  />
                )}
              />
            </CardContent>
          </Card>

          <Button variant={'secondary'} disabled={getLoading || putLoading}>
            {getLoading || putLoading ? (
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
