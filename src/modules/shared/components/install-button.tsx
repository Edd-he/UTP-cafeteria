'use client'

import { useEffect, useState } from 'react'
import { FiDownload } from 'react-icons/fi'

import { Button } from './ui/button'
import { useMediaQuery } from '../hooks/use-media-query'

const InstallButton = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isCompatible, setIsCompatible] = useState(false)
  const isInStandalone = useMediaQuery('(display-mode: standalone)')

  useEffect(() => {
    const isInStandaloneMode =
      isInStandalone || (window.navigator as any).standalone === true

    setIsStandalone(isInStandaloneMode)

    if ('serviceWorker' in navigator) {
      setIsCompatible(true)
    }

    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault()
      setInstallPrompt(event)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
  }, [isInStandalone])

  const handleInstallClick = async () => {
    if (!installPrompt) return

    installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  if (isStandalone || !isCompatible) return null

  return (
    <>
      {installPrompt && (
        <Button
          onClick={handleInstallClick}
          variant="ghost"
          size="lg"
          className="duration-200"
        >
          <FiDownload size={30} />
        </Button>
      )}
    </>
  )
}

export default InstallButton
