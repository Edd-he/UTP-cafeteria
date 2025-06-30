/* eslint-disable no-unused-vars */
'use client'

import { FetchReniecForm } from './fetch-reniec-form'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/modules/shared/components/ui/dialog'

type Props = {
  open: boolean
  handleOpenChange: (open: boolean) => void
  handleFetchReniec: (dni: string, nombre: string, apellidos: string) => void
}

export function FetchReniecDialog({
  open,
  handleOpenChange,
  handleFetchReniec,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Consultar DNI</DialogTitle>
          <DialogDescription className="text-xl text-left flex justify-between items-center"></DialogDescription>

          <FetchReniecForm
            handleFetchReniec={handleFetchReniec}
            handleOpenChange={handleOpenChange}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
