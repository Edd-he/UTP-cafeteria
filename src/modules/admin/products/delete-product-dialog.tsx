/* eslint-disable no-unused-vars */
'use client'
import { toast } from 'sonner'
import { AiOutlineLoading } from 'react-icons/ai'
import { Button } from '@shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared/components/ui/dialog'

import { Product } from '@/modules/shared/interfaces/products.interfaces'
import { useDeleteData } from '@/modules/shared/hooks/use-delete-data'

type Props = {
  product: Product | null
  open: boolean
  handleOpenChange: (open: boolean) => void
  handlRefresh: () => void
}

export function DeleteProductDialog({
  open,
  product,
  handleOpenChange,
  handlRefresh,
}: Props) {
  const { deleteData, error, loading } = useDeleteData(
    `/api/products/${product?.id}`,
  )
  const handleDelete = async () => {
    try {
      console.warn(product)

      await deleteData()

      handleOpenChange(false)
      handlRefresh()
      if (error) {
        throw new Error(error)
      }
      toast('Eliminado Correctamente')
    } catch (error: any) {
      if (error instanceof Error) toast.error(error.message)

      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar {product?.name}</DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar este producto permanentemente?
          </DialogDescription>
          <div className="w-full flex justify-between items-center pt-6">
            <Button
              variant={'destructive'}
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading
                  size={18}
                  className="animate-spin ease-in-out"
                />
              ) : (
                <>Confirmar</>
              )}
            </Button>

            <Button
              variant={'secondary'}
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
