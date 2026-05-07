import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'

// children prop — FormWrapper is a reusable wrapper around any form
const FormWrapper = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="flex gap-2">
    {children}
  </form>
)

const SearchBar = () => {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const navigate  = useNavigate()
  const { setQuery } = useSearch()

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    if (!input.trim()) {
      setError('Please enter a city name')
      return
    }

    setError('')
    setQuery(input.trim())
    navigate(`/city/${input.trim()}`)
    setInput('')
  }, [input, navigate, setQuery])

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => { setInput(e.target.value); setError('') }}
          placeholder="Search any city..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
          Search
        </button>
      </FormWrapper>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

export default SearchBar
