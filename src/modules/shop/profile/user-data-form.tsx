'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'

// type UserDataInput = {
//   dni: string
//   email: string
//   number: string
// }

type UserData = {
  dni: string
  name: string
  lastName: string
  email: string
  number: string
}

export default function UserDataForm() {
  const [user] = useState<UserData | null>(null)
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>Maneja tu información en general</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="name">Nombre Completo:</label>
          <p className="text-base sm:text-lg md:text-xl font-semibold">
            {user?.name + ' ' + user?.lastName}
          </p>
        </div>
        <form className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="dni">Codigo:</label>
            <p className="text-red-600 text-xs">Codigo</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="email">Correo Electrónico:</label>
            <p className="text-red-600 text-xs">Correo</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="number">Número Telefónico:</label>

            <p className="text-red-600 text-xs">número telefonico</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
