import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import CloseSessionButton from '@/modules/auth/session/close-session-button'
import { authOptions } from '@/modules/auth/auth-options'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/modules/shared/components/ui/card'
import { extractStudentCode } from '@/lib/format-code'
import EnableNotificationsButton from '@/modules/shared/components/enable-notifications-button'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }

  const { usuario, correo, rol } = session.user
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
                <label htmlFor="dni">Rol:</label>
                <p className="text-base  font-semibold">{rol}</p>
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Código:</label>
                <p className="text-base font-semibold">
                  {extractStudentCode(correo)}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
        <EnableNotificationsButton />

        <CloseSessionButton
          label="Cerrar Sesión"
          iconSize={22}
          className="p-2 w-full md:hidden bg-primary hover:bg-primary/80 text-white"
        />
      </div>
    </>
  )
}
