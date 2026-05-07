import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider }  from './context/ThemeContext'
import { DataProvider }   from './context/DataContext'
import { SearchProvider } from './context/SearchContext'
import ErrorBoundary  from './components/ErrorBoundary'
import Header         from './components/Header'
import Dashboard      from './pages/Dashboard'
import CityAnalysis   from './pages/CityAnalysis'

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <DataProvider>
        <SearchProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50 dark:bg-black">
              <Header />
              <Routes>
                <Route path="/"           element={<Dashboard />}    />
                <Route path="/city/:name" element={<CityAnalysis />} />
              </Routes>
            </div>
          </BrowserRouter>
        </SearchProvider>
      </DataProvider>
    </ThemeProvider>
  </ErrorBoundary>
)

export default App
