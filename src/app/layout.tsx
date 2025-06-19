import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Toaster } from '@shared/components/ui/sonner'

import { NextAuthProvider } from '@/providers/session-provider'
import { META_DATA } from '@/config/metadata'
import { lato } from '@/config/fonts'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

export const metadata: Metadata = META_DATA

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <html
        lang="es"
        suppressHydrationWarning
        className="scrollbar-thin scrollbar-track-background scrollbar-thumb-red-600"
      >
        <body className={`${lato.className}`}>
          <ThemeProvider forcedTheme="light" defaultTheme="light">
            <NextAuthProvider>
              <div vaul-drawer-wrapper="" className="bg-background">
                {children}
              </div>
              <Toaster closeButton richColors />
            </NextAuthProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
