import { WeatherData } from '../types/weather';
import Image from 'next/image';

interface WeatherDisplayProps {
  data: WeatherData;
  units: 'metric' | 'imperial';
  onToggleUnits: () => void;
  lastUpdated?: Date | null;
}

export default function WeatherDisplay({ data, units, onToggleUnits, lastUpdated }: WeatherDisplayProps) {
  // Convert units based on user preference
  const temperatureUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div 
      className="w-full max-w-md p-6 mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 ease-in-out animate-fadeIn"
      role="region"
      aria-label="Current weather information"
    >
      {/* City and condition header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{data.city}, {data.country}</h2>
          <p className="text-gray-600 dark:text-gray-300 capitalize">{data.condition}</p>
        </div>
        <Image
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.condition}
          width={100}
          height={100}
          className="transition-transform hover:scale-110 duration-200"
        />
      </div>

      {/* Temperature and unit toggle */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-5xl font-extrabold">{data.temperature}{temperatureUnit}</div>
        <button
          onClick={onToggleUnits}
          className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label={`Switch to ${units === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
        >
          Switch to {units === 'metric' ? '°F' : '°C'}
        </button>
      </div>

      {/* Additional weather details */}
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <div>Feels like: {data.feelsLike}{temperatureUnit}</div>
        <div>Humidity: {data.humidity}%</div>
        <div>Wind: {data.windSpeed} {speedUnit}</div>
      </div>

      {/* Last updated timestamp */}
      {lastUpdated && (
        <div className="mt-4 text-xs text-right text-gray-400 dark:text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
