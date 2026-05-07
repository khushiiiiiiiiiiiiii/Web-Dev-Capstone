import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchCityData } from '../utils/api'
import { useDataCache } from '../context/DataContext'

const useFetchCity = (city) => {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const abortRef  = useRef(null)
  const { save, get } = useDataCache()

  const load = useCallback(async (cityName) => {
    if (!cityName) return

    // use cache if available
    const cached = get(cityName)
    if (cached) { setData(cached); return }

    // cancel previous request
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const result = await fetchCityData(cityName)
      setData(result)
      save(cityName, result)
    } catch (e) {
      if (e.name === 'AbortError') return
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [get, save])

  // fetch on mount and when city changes
  useEffect(() => {
    load(city)
    return () => abortRef.current?.abort()
  }, [city, load])

  // auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => load(city), 300000)
    return () => clearInterval(interval)
  }, [city, load])

  return { data, loading, error, refresh: () => load(city) }
}

export default useFetchCity
