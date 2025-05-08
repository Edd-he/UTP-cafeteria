'use client'

import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import { Input } from '@shared/components/ui/input'

type Input = {
  password: string
  newPassword: string
}

export default function UserChangePasswordForm() {
  const [loading] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguridad</CardTitle>
        <CardDescription>Maneja la contraseña de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4">
          <div className="grid gap-2">
            <label htmlFor="current-password">Contraseña Actual</label>
            <Input
              id="current-password"
              type="password"
              placeholder="********"
            />

            <p className="text-red-600 text-xs">mensaje de error</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="new-password">Nueva Contraseña</label>
            <Input id="new-password" type="password" placeholder="********" />

            <p className="text-red-600 text-xs">mensaje de erroe</p>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
