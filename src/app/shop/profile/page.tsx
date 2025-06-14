import CloseSessionButton from '@auth/session/close-session-btn'
import UserChangePasswordForm from '@shop/profile/user-change-password-form'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/modules/auth/auth-options'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/modules/shared/components/ui/card'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  const { id, usuario, correo, rol } = session.user
  return (
    <>
      <div className="space-y-6 max-sm:pb-24 pt-5">
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>Información en general</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="name">Nombre Completo:</label>
              <p className="text-base font-semibold">{usuario}</p>
            </div>
            <form className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="dni">Codigo:</label>
                <p className="text-base  font-semibold">{rol}</p>
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Correo Electrónico:</label>
                <p className="text-base font-semibold">{correo}</p>
              </div>
            </form>
          </CardContent>
        </Card>

        <UserChangePasswordForm id={id} />

        <CloseSessionButton
          label="Cerrar Sesión"
          iconSize={22}
          className="p-2 w-full md:hidden bg-primary hover:bg-primary/80"
        />
      </div>
    </>
  )
}
