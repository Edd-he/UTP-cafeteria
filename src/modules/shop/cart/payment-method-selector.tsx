'use client'

import { useState } from 'react'
import { Smartphone } from 'lucide-react'

import { Input } from '@/modules/shared/components/ui/input'
import { Label } from '@/modules/shared/components/ui/label'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/modules/shared/components/ui/radio-group'
import { Badge } from '@/modules/shared/components/ui/badge'

export default function PaymentMethodSelector() {
  const [paymentMethod, setPaymentMethod] = useState<'YAPE' | 'PLIN'>('YAPE')

  return (
    <div className="w-full flex flex-col gap-2">
      <span>Método de Pago:</span>
      <RadioGroup
        value={paymentMethod}
        onValueChange={(value) => setPaymentMethod(value as any)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Label
            htmlFor="YAPE"
            className="flex items-center gap-2 cursor-pointer"
          >
            <RadioGroupItem value="YAPE" id="YAPE" />
            <Smartphone className="h-4 w-4 text-purple-600" />
            Yape
          </Label>
          <Badge className="bg-purple-100 text-purple-700 ml-auto">
            Popular
          </Badge>
        </div>

        {paymentMethod === 'YAPE' && (
          <div className="ml-6 space-y-4 border-l-2 border-purple-200 pl-4">
            <label htmlFor="yape" className="flex flex-col gap-2 text-sm">
              Número de celular
              <Input id="yape" placeholder="987654321" maxLength={9} />
            </label>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Label
            htmlFor="PLIN"
            className="flex items-center gap-2 cursor-pointer"
          >
            <RadioGroupItem value="PLIN" id="PLIN" />
            <Smartphone className="size-4 text-green-600" />
            Plin
          </Label>
        </div>

        {paymentMethod === 'PLIN' && (
          <div className="ml-6 space-y-4 border-l-2 border-green-200 pl-4">
            <label htmlFor="yape" className="flex flex-col gap-2 text-sm">
              Número de celular
              <Input id="plin" placeholder="987654321" maxLength={9} />
            </label>
          </div>
        )}
      </RadioGroup>
    </div>
  )
}
