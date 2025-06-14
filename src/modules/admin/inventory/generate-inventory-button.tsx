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
  const { sendRequest, loading } = useSendRequest(
    `${BACKEND_URL}/inventario/generar-inventario`,
    'POST',
  )
  const toastIdRef = useRef<string | number | null>(null)
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
      toastIdRef.current = toast.loading('Generando Inventario')
    } else if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current)
      toastIdRef.current = null
    }
  }, [loading])

  return (
    <Button className={cn(className)} onClick={() => generateInventory()}>
      Generar Inventario
    </Button>
  )
}
