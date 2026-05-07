import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const { isDark, toggle } = useTheme()
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <span className="text-xl font-bold text-gray-900 dark:text-white">🌿 EcoAir</span>
      <div className="flex items-center gap-6">
        <NavLink to="/" end className={({ isActive }) =>
          isActive ? 'text-blue-500 text-sm font-medium' : 'text-gray-500 text-sm'
        }>
          Dashboard
        </NavLink>
        <button onClick={toggle} className="text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300">
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  )
}

export default Header
