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

import { BACKEND_URL } from '@/lib/constants'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { User } from '@/modules/shared/types/user.interfaces'

type Props = {
  user: User | null
  open: boolean
  handleOpenChange: (open: boolean) => void
  handleRefresh: () => void
}

export function DeleteUserDialog({
  open,
  user,
  handleOpenChange,
  handleRefresh,
}: Props) {
  const DELETE_URL = `${BACKEND_URL}/usuarios/${user?.id}/remover-usuario`
  const { sendRequest, loading } = useSendRequest(DELETE_URL, 'DELETE')

  const handleDelete = async () => {
    const { error } = await sendRequest()

    handleOpenChange(false)
    handleRefresh()

    if (error) {
      toast.error(error)
      return
    }
    toast.success('Usuario Eliminado Correctamente')
    return
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar {user?.nombre}</DialogTitle>
          <DialogDescription>
            ¿Seguro que deseas eliminar este Usuario permanentemente?
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
