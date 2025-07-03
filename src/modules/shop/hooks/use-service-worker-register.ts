'use client'

import { useEffect } from 'react'

export function useServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.warn('SW registrado:', registration)
        })
        .catch((err) => {
          console.error('Error al registrar SW:', err)
        })
    } else {
      console.warn('Este navegador no soporta Service Workers')
    }
  }, [])
}
