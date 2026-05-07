import { useState, useEffect, useRef } from 'react'

const useDebounce = (value) => {
  const [debounced, setDebounced] = useState(value)
  const timer = useRef(null)

  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setDebounced(value), 500)
    return () => clearTimeout(timer.current)
  }, [value])

  return debounced
}

export default useDebounce
