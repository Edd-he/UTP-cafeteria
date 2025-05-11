import { Suspense } from 'react'

import CountryList from '@/modules/test/components/country-list'

export default function Page() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Lista de Países (SOAP)</h1>
      <Suspense fallback={<div>Cargando países...</div>}>
        <CountryList />
      </Suspense>
    </main>
  )
}
