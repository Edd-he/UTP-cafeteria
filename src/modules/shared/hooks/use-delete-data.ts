import { useState } from 'react'

export function useDeleteData<T>(url: string, auth?: string) {
  const [response, setResponse] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(auth && { Authorization: `Bearer ${auth}` }),
        },
      })

      if (!response.ok) {
        const errorBody = await response.json()
        console.warn(errorBody)
        const message = errorBody.message?.[0] || 'Error desconocido'
        throw new Error(message)
      }

      const result = await response.json()
      setResponse(result)
      return result
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message || 'Error desconocido')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return { deleteData, response, loading, error }
}
