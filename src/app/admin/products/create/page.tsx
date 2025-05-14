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
import ImageUploader from '@shared/components/image-uploader'
import { Button } from '@shared/components/ui/button'
import { ProductFormData } from '@shared/interfaces/products.interfaces'
import { ProductSchema } from '@admin/schemas/product-schema'

import { CATEGORIES } from '@/lib/categories'
import { convertToBase64 } from '@/lib/utils'
import { usePostData } from '@/modules/shared/hooks/use-post-data'

export default function Page() {
  const { postData, loading, error } = usePostData('/products')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
  })

  const { push } = useRouter()

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    let image = 'PENDIENTE'

    if (data.img) image = await convertToBase64(data.img as unknown as File)

    const formData = { ...data, img: image }

    await postData(formData)

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
                    value={field.value as unknown as File}
                    onChange={field.onChange}
                  />
                )}
              />
            </CardContent>
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
