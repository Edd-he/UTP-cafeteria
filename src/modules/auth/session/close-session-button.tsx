'use client'
import { CiLogout } from 'react-icons/ci'
import { signOut } from 'next-auth/react'

import { cn } from '@/lib/utils'

type Props = {
  label?: string
  iconSize?: number
  className?: string
}

export default function CloseSessionButton({
  label,
  iconSize,
  className,
}: Props) {
  const handleCloseSession = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <>
      <button
        onClick={handleCloseSession}
        className={cn(
          'flex-center duration-200 p-2 rounded gap-2 hover:bg-secondary active:bg-pressed cursor-pointer',
          className,
        )}
      >
        <CiLogout size={iconSize} />
        {label}
      </button>
    </>
  )
}
