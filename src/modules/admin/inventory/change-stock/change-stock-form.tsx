'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { AiOutlineLoading } from 'react-icons/ai'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@shared/components/ui/select'
import { Input } from '@shared/components/ui/input'
import { z } from 'zod'

import { changeStockSchema } from '../../schemas/change-stock.schema'

import { ProductInventory } from '@/modules/shared/types/inventory.interfaces'
import { Button } from '@/modules/shared/components/ui/button'
import { BACKEND_URL } from '@/lib/constants'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'

type Props = {
  product: ProductInventory | undefined
  onSuccess: () => void
}
type ChangeStockSchemaType = z.infer<typeof changeStockSchema>

export function ChangeStockForm({ product, onSuccess }: Props) {
  const PATCH_URL = `${BACKEND_URL}/inventario/actualizar-stock`
  const { sendRequest, loading } = useSendRequest(PATCH_URL, 'PATCH')
  const {
    register,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeStockSchemaType>({
    resolver: zodResolver(changeStockSchema),
  })

  useEffect(() => {
    if (product) setValue('producto_id', product.producto_id)
  }, [product, setValue])

  const onSubmit: SubmitHandler<ChangeStockSchemaType> = async (data) => {
    const { error } = await sendRequest(data)
    if (error) {
      toast.error(error)
      return
    }

    toast.success('Stock cambiado con éxito')
    reset()
    onSuccess()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7 pt-6 text-left"
    >
      <label className="flex flex-col gap-2 w-full">
        <span>Tipo:</span>
        <Controller
          name="tipo"
          control={control}
          defaultValue="ENTRADA"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="hover:bg-secondary">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent position="popper" hideWhenDetached>
                <SelectItem value="ENTRADA">ENTRADA</SelectItem>
                <SelectItem value="SALIDA">SALIDA</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.tipo && (
          <p className="text-red-600 text-xs">{errors.tipo.message}</p>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span>Cantidad:</span>
        <Input
          id="cantidad"
          type="number"
          {...register('cantidad', { valueAsNumber: true })}
        />
        {errors.cantidad && (
          <p className="text-red-600 text-xs">{errors.cantidad.message}</p>
        )}
      </label>

      <Button
        variant={'default'}
        disabled={loading || !product?.id}
        className="text-lg"
      >
        {loading ? (
          <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
        ) : (
          <>Actualizar Stock</>
        )}
      </Button>
    </form>
  )
}
