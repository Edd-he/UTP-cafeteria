import { useState, useEffect } from 'react'

import { parseErrorHttpMessage } from '@/lib/http/parse-error-http'

export function useGetData<T>(url: string, auth?: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = () => {
    setRefreshKey((prevKey) => prevKey + 1)
  }

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            ...(auth && { Authorization: `Bearer ${auth}` }),
            'Content-Type': 'application/json',
          },
          signal,
        })

        const result = await res.json()

        if (!res.ok) {
          const message = parseErrorHttpMessage(result.message)
          throw new Error(message)
        }

        setData(result)
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === 'AbortError') {
          //
        } else if (e instanceof Error) {
          setError(e.message || 'Error desconocido')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url, refreshKey])

  return { setData, data, loading, error, refresh }
}
