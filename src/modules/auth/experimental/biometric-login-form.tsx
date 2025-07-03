/* eslint-disable no-undef */
'use client'

import { useState } from 'react'
import { Fingerprint, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/modules/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/modules/shared/components/ui/card'

export default function BiometricLoginForm() {
  const [isBiometricLoading, setIsBiometricLoading] = useState(false)

  const isWebAuthnSupported =
    typeof window !== 'undefined' &&
    window.PublicKeyCredential &&
    typeof window.PublicKeyCredential
      .isUserVerifyingPlatformAuthenticatorAvailable === 'function'

  const handleBiometricLogin = async () => {
    if (!isWebAuthnSupported) {
      toast.error('WebAuthn no soportado')
      return
    }

    setIsBiometricLoading(true)

    try {
      const res = await fetch('/api/auth/challenge')
      const { challenge } = await res.json()

      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions =
        {
          challenge: Uint8Array.from(atob(challenge), (c) => c.charCodeAt(0)),
          timeout: 60000,
          userVerification: 'required',
          allowCredentials: [
            {
              id: new Uint8Array(64).map(() => Math.floor(Math.random() * 256)),
              type: 'public-key',
              transports: ['internal'],
            },
          ],
        }

      const credential = (await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })) as PublicKeyCredential

      if (!credential) {
        toast.error('Autenticación fallida')
        return
      }

      const result = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      })

      const data = await result.json()
      if (data.success) {
        toast.success('Inicio de sesión exitoso')
      } else {
        toast.error('Verificación fallida')
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        toast.error('Autenticación cancelada')
      } else {
        toast.error('Error desconocido en autenticación')
      }
    } finally {
      setIsBiometricLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Usa tu huella dactilar con WebAuthn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleBiometricLogin}
            disabled={isBiometricLoading || !isWebAuthnSupported}
            className="w-full"
          >
            {isBiometricLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Autenticando...
              </>
            ) : (
              <>
                <Fingerprint className="mr-2 h-4 w-4" />
                Iniciar con Huella
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
