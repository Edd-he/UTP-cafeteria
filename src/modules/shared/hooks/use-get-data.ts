import { useState, useEffect } from 'react'

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
        const response = await fetch(url, {
          method: 'GET',
          ...(auth && { Authorization: `Bearer ${auth}` }),
        })
        if (!response.ok) {
          const errorBody = await response.json()
          console.warn(errorBody)
          const message = errorBody.message?.[0] || 'Error desconocido'
          throw new Error(message)
        }
        const json = await response.json()
        setData(json)
        setLoading(false)
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
