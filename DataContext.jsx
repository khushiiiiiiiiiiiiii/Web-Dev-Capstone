import { createContext, useContext, useState } from 'react'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [cache, setCache] = useState({})

  const save = (city, data) =>
    setCache(prev => ({ ...prev, [city.toLowerCase()]: data }))

  const get = (city) => cache[city.toLowerCase()] || null

  return (
    <DataContext.Provider value={{ save, get }}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataCache = () => useContext(DataContext)
