'use client'

import { toast } from 'sonner'
import { AiOutlineLoading } from 'react-icons/ai'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { Order } from '@/modules/shared/interfaces/order.interfaces'
import { BACKEND_URL } from '@/lib/constants'

type Props = {
  open: boolean
  onClose: () => void
  order: Order | null
  refresh?: () => void
}
export default function OrderChangeStatusDialog({
  refresh,
  open,
  onClose,
  order,
}: Props) {
  if (!order) return null

  let url = `${BACKEND_URL}/ordenes/${order.id}/procesar-orden`
  let label = 'Procesar orden'
  switch (order.estado) {
    case 'EN_PROCESO':
      url = `${BACKEND_URL}/ordenes/${order.id}/recoger-orden`
      label = 'Pasar a recoger orden'
      break
    case 'RECOGER':
      url = `${BACKEND_URL}/ordenes/${order.id}/completar-orden`
      label = 'Completar orden'
      break
  }

  const { sendRequest, loading } = useSendRequest(url, 'PATCH')

  const onSubmit = async () => {
    const { error } = await sendRequest()
    if (error) {
      toast.error(error)
      return
    }
    refresh?.()
    onClose()
    toast.success(`ORD-00${order.id} ha cambiado de estado`)
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar estado de la ORD-00{order.id}</DialogTitle>
          <DialogDescription>
            ¿Seguro que desea de cambiar el estado de la orden?
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? (
            <AiOutlineLoading size={18} className="animate-spin ease-in-out" />
          ) : (
            <>{label}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
