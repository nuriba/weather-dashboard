'use client';

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { useWeatherStore } from './store/weatherStore';
import { useWeatherQuery } from './hooks/useWeatherQuery';

export default function Home() {
  // Zustand store for global state management (city, history, units)
  const {
    searchHistory,
    units,
    setCity,
    toggleUnits,
    clearHistory
  } = useWeatherStore();

  // Local state for the search input and the last submitted city
  const [searchCity, setSearchCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Persist dark mode preference
  useEffect(() => {
    const stored = localStorage.getItem('weather-dark-mode');
    if (stored) setDarkMode(stored === 'true');
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('weather-dark-mode', String(darkMode));
  }, [darkMode]);

  // Fetch weather and forecast data for the submitted city using SWR
  const {
    weatherData,
    forecastData,
    isLoading,
    error,
    lastUpdated
  } = useWeatherQuery(submittedCity, units);

  // Handle search from the input (triggered by button or Enter)
  const handleSearch = (city: string) => {
    setSubmittedCity(city); // triggers data fetch
    setCity(city); // updates global state and history
    setHasSearched(true);
  };

  // When a history item is clicked, update both input and fetch
  const handleSelectFromHistory = (city: string) => {
    setSubmittedCity(city);
    setSearchCity(city);
    setCity(city);
    setHasSearched(true);
  };

  return (
    <main className={
      `min-h-screen flex items-center justify-center transition-colors duration-300 ` +
      (darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-100 to-blue-300')
    }>
      <div className={
        `w-full max-w-lg p-8 rounded-2xl shadow-2xl transition-colors duration-300 ` +
        (darkMode ? 'bg-gray-900 text-white' : 'bg-white')
      }>
        {/* Dark mode toggle button */}
        <button
          className={
            'absolute top-4 right-4 px-3 py-1 rounded-full font-semibold shadow ' +
            (darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')
          }
          onClick={() => setDarkMode((d) => !d)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
        {/* App Title */}
        <h1 className="mb-8 text-4xl font-extrabold text-center text-blue-700 dark:text-blue-300 drop-shadow">Weather Dashboard</h1>
        <div className="flex flex-col items-center w-full">
          {/* Search bar with controlled input */}
          <SearchBar
            value={searchCity}
            onChange={setSearchCity}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          {/* Search history (last 5 cities, clickable) */}
          <SearchHistory 
            history={searchHistory} 
            onSelect={handleSelectFromHistory} 
            onClearHistory={clearHistory} 
          />
          {/* Loading spinner */}
          {isLoading && <LoadingSpinner />}
          {/* Error message for invalid city or API error */}
          <ErrorDisplay error={error} hasSearched={hasSearched} />
          {/* Weather and forecast display (only if data is available and no error) */}
          {weatherData && !error && (
            <>
              <WeatherDisplay
                data={weatherData}
                units={units}
                onToggleUnits={toggleUnits}
                lastUpdated={lastUpdated}
              />
              {forecastData && forecastData.length > 0 && (
                <ForecastDisplay forecast={forecastData} units={units} />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}