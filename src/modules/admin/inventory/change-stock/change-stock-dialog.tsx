/* eslint-disable no-unused-vars */
'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@shared/components/ui/dialog'

import { ChangeStockForm } from './change-stock-form'

import { ProductInventory } from '@/modules/shared/types/inventory.interfaces'

type Props = {
  product: ProductInventory | undefined
  setOpen: (value: boolean) => void
  open: boolean
  refresh: () => void
}

export function ChangeStockDialog({ product, refresh, setOpen, open }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Cambiar Stock</DialogTitle>
          <DialogDescription className="text-xl text-left flex justify-between items-center">
            <span>{product?.nombre_producto}</span>
          </DialogDescription>

          <ChangeStockForm
            product={product}
            onSuccess={() => {
              setOpen(false)
              refresh()
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
