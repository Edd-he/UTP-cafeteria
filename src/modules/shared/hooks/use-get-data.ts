import { useState, useEffect } from 'react'

import { parseErrorHttpMessage } from '@/lib/http/parse-error-http'
export function useGetData<T>(url: string, auth?: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshkey, setRefreshKey] = useState(0)

  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1)
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            ...(auth && { Authorization: `Bearer ${auth}` }),
            'Content-Type': 'application/json',
          },
        })

        const result = await res.json()

        if (!res.ok) {
          const message = parseErrorHttpMessage(result.message)
          throw new Error(message)
        }
        setData(result)
        return
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message || 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url, refreshkey])

  return { setData, data, loading, error, refresh }
}
