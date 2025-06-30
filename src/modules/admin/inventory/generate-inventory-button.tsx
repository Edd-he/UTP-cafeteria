'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { BACKEND_URL } from '@/lib/constants'
import { Button } from '@/modules/shared/components/ui/button'
import { useSendRequest } from '@/modules/shared/hooks/use-send-request'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  onSuccess?: () => void
}
export default function GenerateInventoryButton({
  className,
  onSuccess,
}: Props) {
  const POST_URL = `${BACKEND_URL}/inventario/generar-inventario`
  const { sendRequest, loading } = useSendRequest(POST_URL, 'POST')

  const toastReference = useRef<string | number | null>(null)

  async function generateInventory() {
    const { error } = await sendRequest()
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Inventario generado con éxito')
    onSuccess?.()
  }

  useEffect(() => {
    if (loading) {
      toastReference.current = toast.loading('Generando Inventario')
    } else if (toastReference.current) {
      toast.dismiss(toastReference.current)
      toastReference.current = null
    }
  }, [loading])

  return (
    <Button className={cn(className)} onClick={() => generateInventory()}>
      Generar Inventario
    </Button>
  )
}
