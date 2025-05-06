import type { Metadata } from 'next'

export const META_DATA: Metadata = {
  title: 'UTP',
  description:
    'Sistema creado para el curso de Arquitectura orientada a Servicios',
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'Web App',
    statusBarStyle: 'default',
  },
}
