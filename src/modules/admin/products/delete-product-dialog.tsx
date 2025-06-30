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

import { Product } from '@/modules/shared/types/product.interfaces'
import { BACKEND_URL } from '@/lib/constants'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'

type Props = {
  product: Product | null
  open: boolean
  handleOpenChange: (open: boolean) => void
  handleRefresh: () => void
}

export function DeleteProductFormDialog({
  open,
  product,
  handleOpenChange,
  handleRefresh,
}: Props) {
  const DELETE_URL = `${BACKEND_URL}/productos/${product?.id}/remover-producto`
  const { sendRequest, loading } = useSendRequest(DELETE_URL, 'DELETE')

  const handleDelete = async () => {
    const { error } = await sendRequest()

    if (error) {
      toast.error(error)
      return
    }
    handleOpenChange(false)
    handleRefresh()

    toast.success('Producto Eliminado Correctamente')
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar {product?.nombre}</DialogTitle>
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
