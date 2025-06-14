'use client'
import { useSession } from 'next-auth/react'

export default function UserWelcome() {
  const { data: session } = useSession()
  if (!session) return null
  const { usuario } = session.user
  const username = usuario.split(' ')[0]
  const letters = username.split('')
  const name =
    letters[0].toUpperCase() + letters.slice(1).join('').toLowerCase()
  return (
    <h2 className="text-5xl lg:text-6xl xl:text-8xl inline-block">
      Bienvenido, <span className="text-primary animate-pulse">{name}</span>
    </h2>
  )
}
