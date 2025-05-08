import UserDataForm from '@shop/profile/user-data-form'
import CloseSessionButton from '@auth/session/close-session-btn'
import UserChangePasswordForm from '@shop/profile/user-change-password-form'

export default async function Page() {
  // const session = await getServerSession(authOptions)
  // if (!session) {
  //   redirect('/auth/login')
  //   return
  // }

  // const { id } = session.user
  return (
    <>
      <div className="space-y-6 max-sm:pb-24 pt-5">
        <UserDataForm />

        <UserChangePasswordForm />

        <CloseSessionButton
          label="Cerrar Sesión"
          iconSize={22}
          className="p-2 w-full md:hidden bg-primary hover:bg-primary/80"
        />
      </div>
    </>
  )
}
