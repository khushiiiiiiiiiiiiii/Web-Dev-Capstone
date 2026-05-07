import { useParams, Link } from 'react-router-dom'
import useFetchCity from '../hooks/useFetchCity'
import SearchBar from '../components/SearchBar'
import AQICard from '../components/AQICard'
import PollutantChart from '../components/PollutantChart'

const CityAnalysis = () => {
  const { name } = useParams()
  const { data, loading, error, refresh } = useFetchCity(name)

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-block">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{name}</h1>
      <p className="text-gray-400 text-sm mb-8">Air quality analysis</p>

      <div className="mb-8">
        <SearchBar />
      </div>

      {loading && !data && (
        <div className="flex items-center justify-center py-20 gap-3">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-sm text-gray-400">Loading {name}...</span>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            {error === 'CITY_NOT_FOUND' ? `"${name}" not found` : 'Network error'}
          </p>
          <button onClick={refresh} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm mt-4">
            Try Again
          </button>
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <AQICard data={data} loading={loading} onRefresh={refresh} />
          <PollutantChart data={data} />
        </div>
      )}

    </div>
  )
}

export default CityAnalysis
