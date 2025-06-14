import { useState } from 'react'

export type SortConfig<T> = {
  key: keyof T
  order: 'asc' | 'desc'
}

export function useSortableData<T>(initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData)
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)

  const sort = (key: keyof T) => {
    let order: 'asc' | 'desc' = 'asc'

    if (sortConfig?.key === key && sortConfig.order === 'asc') {
      order = 'desc'
    }

    const sorted = [...data].sort((a, b) => {
      const aValue = a[key]
      const bValue = b[key]

      if (aValue === undefined || bValue === undefined) return 0
      if (aValue === null || bValue === null) return 0
      if (aValue < bValue) return order === 'asc' ? -1 : 1
      if (aValue > bValue) return order === 'asc' ? 1 : -1
      return 0
    })

    setSortConfig({ key, order })
    setData(sorted)
  }

  const updateData = (newData: T[]) => {
    setData(newData)
    if (sortConfig) {
      sort(sortConfig.key)
    }
  }

  return {
    data,
    sortConfig,
    sort,
    updateData,
  }
}
