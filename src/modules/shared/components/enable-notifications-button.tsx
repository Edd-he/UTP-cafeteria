'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Bell } from 'lucide-react'

import { Button } from './ui/button'

import { BACKEND_URL } from '@/lib/constants'

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_KEY!

export default function EnableNotificationsButton() {
  const { data: session } = useSession()
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>(
    'idle',
  )
  const [errorMessage, setErrorMessage] = useState('')

  const handleClick = async () => {
    if (!('serviceWorker' in navigator)) {
      setErrorMessage('Tu navegador no soporta Service Workers.')
      setStatus('error')
      return
    }

    if (!session?.user?.id || session.user.rol !== 'ESTUDIANTE') {
      setErrorMessage('Usuario no autorizado para recibir notificaciones.')
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const swRegistration = await navigator.serviceWorker.ready

      const existingSub = await swRegistration.pushManager.getSubscription()
      if (existingSub) {
        await existingSub.unsubscribe()
      }

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setErrorMessage('Permiso de notificación denegado.')
        setStatus('error')
        return
      }

      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      })

      const res = await fetch(`${BACKEND_URL}/eventos/guardar-subscripcion`, {
        method: 'POST',
        body: JSON.stringify({
          userId: session.user.id,
          subscription,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        setStatus('done')
      } else {
        setErrorMessage('Error al guardar la suscripción.')
        setStatus('error')
      }
    } catch (err: any) {
      setErrorMessage('Error en el proceso: ' + err.message)
      setStatus('error')
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleClick} disabled={status === 'loading'}>
        <Bell className="mr-2 h-4 w-4" />
        {status === 'done' ? 'Activado' : 'Activar notificaciones'}
      </Button>
      {status === 'error' && (
        <p className="text-sm text-red-500 max-w-sm">{errorMessage}</p>
      )}
      {status === 'done' && (
        <p className="text-sm text-green-500">
          Notificaciones activadas correctamente.
        </p>
      )}
    </div>
  )
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\\-/g, '+')
    .replace(/_/g, '/')
  return Buffer.from(base64, 'base64')
}
