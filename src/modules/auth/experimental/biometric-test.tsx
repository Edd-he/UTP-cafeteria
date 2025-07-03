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

  // Verificar si WebAuthn está disponible
  const isWebAuthnSupported =
    typeof window !== 'undefined' &&
    window.PublicKeyCredential &&
    typeof window.PublicKeyCredential
      .isUserVerifyingPlatformAuthenticatorAvailable === 'function'

  const handleBiometricLogin = async () => {
    if (!isWebAuthnSupported) {
      toast.error(
        'La autenticación biométrica no está disponible en este dispositivo',
      )
      return
    }

    setIsBiometricLoading(true)

    try {
      // Verificar disponibilidad del autenticador
      const available =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()

      if (!available) {
        toast.error('No hay autenticador biométrico disponible')
        return
      }

      // Configuración para la autenticación
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions =
        {
          challenge: new Uint8Array(32).map(() =>
            Math.floor(Math.random() * 256),
          ),
          allowCredentials: [
            {
              id: new Uint8Array(64).map(() => Math.floor(Math.random() * 256)),
              type: 'public-key',
              transports: ['internal'],
            },
          ],
          timeout: 60000,
          userVerification: 'required',
        }

      // Solicitar autenticación biométrica
      const credential = (await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      })) as PublicKeyCredential

      if (credential) {
        // Simular verificación exitosa
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast.success('Autenticación biométrica exitosa')
      }
    } catch (error: any) {
      console.error('Error en autenticación biométrica:', error)

      if (error.name === 'NotAllowedError') {
        toast.error('Autenticación biométrica cancelada o denegada')
      } else if (error.name === 'NotSupportedError') {
        toast.error('Autenticación biométrica no soportada')
      } else {
        toast.error('Error en la autenticación biométrica')
      }
    } finally {
      setIsBiometricLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Iniciar Sesión
          </CardTitle>
          <CardDescription className="text-center">
            Accede de forma segura con tu huella dactilar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Autenticación Biométrica */}
          <div className="space-y-3">
            <Button
              onClick={handleBiometricLogin}
              disabled={isBiometricLoading || !isWebAuthnSupported}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              size="lg"
            >
              {isBiometricLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  <Fingerprint className="mr-2 h-5 w-5" />
                  Iniciar con Huella Dactilar
                </>
              )}
            </Button>

            {!isWebAuthnSupported && (
              <p className="text-sm text-muted-foreground text-center">
                La autenticación biométrica no está disponible en este navegador
              </p>
            )}
          </div>

          <div className="mt-6 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo:</strong> Haz clic en el botón para probar la
              autenticación biométrica
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
