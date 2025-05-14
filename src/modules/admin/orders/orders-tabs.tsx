'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

const tabs = [
  { label: 'Todas', value: 'todas' },
  { label: 'En proceso', value: 'proceso' },
  { label: 'Pendientes', value: 'pendientes' },
  { label: 'Canceladas', value: 'canceladas' },
]

export default function OrdersTabs() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const currentStatus = searchParams.get('orderStatus') || 'todas'

  function handleOrder(status: string) {
    const params = new URLSearchParams(searchParams)
    if (status) {
      params.set('orderStatus', status)
    } else {
      params.delete('orderStatus')
    }
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="relative w-full flex bg-white rounded-md border border-input p-2 gap-2">
      {tabs.map((tab) => {
        const isActive = currentStatus === tab.value
        return (
          <button
            key={tab.value}
            onClick={() => handleOrder(tab.value)}
            className={`w-1/4 h-10 duration-200 cursor-pointer focus-visible:ring-ring focus-visible:ring-2 outline-none  ${
              isActive
                ? 'bg-primary text-white'
                : 'active:bg-blue-light/10 hover:bg-secondary'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
