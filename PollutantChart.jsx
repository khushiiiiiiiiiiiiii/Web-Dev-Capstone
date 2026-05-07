import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

const PollutantChart = ({ data }) => {

  // useMemo — only re-sorts when data changes
  const chartData = useMemo(() => [
    { name: 'PM2.5', value: parseFloat(data.pm2_5.toFixed(2)) },
    { name: 'PM10',  value: parseFloat(data.pm10.toFixed(2))  },
    { name: 'CO',    value: parseFloat(data.co.toFixed(2))    },
  ].sort((a, b) => b.value - a.value), [data])

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Pollutants</h3>
      <p className="text-xs text-gray-400 mb-6">PM2.5 · PM10 · CO in µg/m³</p>

      {/* Bar Chart */}
      <p className="text-xs text-gray-400 uppercase mb-3">Comparison</p>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Area Chart */}
      <p className="text-xs text-gray-400 uppercase mt-6 mb-3">Trend</p>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#grad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PollutantChart
