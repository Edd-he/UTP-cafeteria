'use client'

import { useEffect, useState } from 'react'

import { TimePicker } from '@/modules/shared/components/time-picker/time-picker'
import { useCartStore } from '@/store/cart-store'

export default function CartTimePicker() {
  const time = useCartStore((state) => state.time)
  const setTime = useCartStore((state) => state.setTime)

  const [date, setDate] = useState<Date | undefined>(time)

  useEffect(() => {
    if (date) setTime(date)
  }, [date, setTime])

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="w-full flex items-center justify-between">
        <span className="tracking-tight leading-none">Hora Programada:</span>
        <TimePicker date={date} setDate={setDate} />
      </div>
      {date && (date.getHours() < 9 || date.getHours() >= 22) && (
        <p className="text-xs text-red-500 w-full text-center">
          La hora permitida es entre las 9:00 y 22:00
        </p>
      )}
    </div>
  )
}
