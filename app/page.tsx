'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import { useWeatherStore } from './store/weatherStore';
import { useWeatherQuery } from './hooks/useWeatherQuery';

export default function Home() {
  const {
    searchHistory,
    units,
    setCity,
    toggleUnits,
  } = useWeatherStore();

  // Local state for the city to search
  const [searchCity, setSearchCity] = useState('');
  const [submittedCity, setSubmittedCity] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Only fetch weather if a city is submitted
  const {
    weatherData,
    forecastData,
    isLoading,
    error
  } = useWeatherQuery(submittedCity, units);

  const handleSearch = (city: string) => {
    setSubmittedCity(city);
    setSearchCity(city);
    setCity(city);
    setHasSearched(true);
  };

  // When a history item is clicked, trigger a search and update input
  const handleSelectFromHistory = (city: string) => {
    setSubmittedCity(city);
    setSearchCity(city);
    setCity(city);
    setHasSearched(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="relative w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-all duration-500">
        <h1 className="mb-8 text-4xl font-extrabold text-center text-blue-700 dark:text-blue-400 drop-shadow">Weather Dashboard</h1>
        <div className="flex flex-col items-center w-full">
          <SearchBar
            value={searchCity}
            onChange={setSearchCity}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          <SearchHistory history={searchHistory} onSelect={handleSelectFromHistory} />
          <ErrorDisplay 
            error={error ? new Error("City not found or there was an error fetching weather data.") : null} 
            hasSearched={hasSearched}
          />
          {weatherData && !error && (
            <>
              <WeatherDisplay
                data={weatherData}
                units={units}
                onToggleUnits={toggleUnits}
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