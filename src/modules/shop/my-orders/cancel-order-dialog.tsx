'use client'

import { toast } from 'sonner'
import { AiOutlineLoading } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/modules/shared/components/ui/dialog'
import { Button } from '@/modules/shared/components/ui/button'
import { BACKEND_URL } from '@/lib/constants'
import { Order } from '@/modules/shared/types/order.interfaces'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'

type Props = {
  order: Order | null
  onSuccess?: () => void
}
export default function CancelOrderDialog({ order, onSuccess }: Props) {
  const PATCH_URL = `${BACKEND_URL}/ordenes/${order?.id}/cancelar-orden`

  const { loading, sendRequest } = useSendRequest(PATCH_URL, 'PATCH')

  const onSubmit = async () => {
    const { error } = await sendRequest()
    if (error) {
      toast.error('Error al cancelar la orden')
      return
    }
    toast.success('Orden cancelada con éxito')
    onSuccess?.()
  }
  return (
    <Dialog>
      <Button asChild size={'sm'} className="gap-2">
        <DialogTrigger>
          <MdOutlineCancel />
          Cancelar
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seguro que desea cancelar la orden?</DialogTitle>
          <DialogDescription>No hay devoluciones</DialogDescription>
        </DialogHeader>
        <div className="flex justify-start items-center py-2">
          <Button onClick={onSubmit} disabled={loading}>
            {loading ? (
              <AiOutlineLoading
                size={18}
                className="animate-spin ease-in-out"
              />
            ) : (
              <> Cancelar Orden</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
