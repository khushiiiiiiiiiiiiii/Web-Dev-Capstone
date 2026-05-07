import { AQI_LABELS, AQI_COLORS } from '../utils/constants'

const AQICard = ({ data, loading, onRefresh }) => {
  const label = AQI_LABELS[data.aqi] || 'Unknown'
  const color = AQI_COLORS[data.aqi] || '#6B7280'

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">

      {/* City + AQI */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data.city}</h2>
          <p className="text-gray-400 text-sm">{data.country} · {data.condition}</p>
        </div>
        <div className="text-center px-4 py-2 rounded-xl" style={{ background: color + '20' }}>
          <p className="text-3xl font-bold" style={{ color }}>{data.aqi}</p>
          <p className="text-xs font-medium" style={{ color }}>{label}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
        {[
          { label: 'Temp',     value: `${data.temp}°C`    },
          { label: 'Humidity', value: `${data.humidity}%` },
          { label: 'Wind',     value: `${data.wind} km/h` },
        ].map(s => (
          <div key={s.label}>
            <p className="text-xs text-gray-400 uppercase mb-1">{s.label}</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Refresh */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-400">Auto-refreshes every 5 min</span>
        </div>
        <button onClick={onRefresh} disabled={loading} className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-40">
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

    </div>
  )
}

export default AQICard
