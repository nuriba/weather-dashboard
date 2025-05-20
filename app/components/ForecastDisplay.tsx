import { ForecastData } from '../types/weather';
import Image from 'next/image';

interface ForecastDisplayProps {
  forecast: ForecastData[];
  units: 'metric' | 'imperial';
}

export default function ForecastDisplay({ forecast, units }: ForecastDisplayProps) {
  const temperatureUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="w-full max-w-md mt-6">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">5-Day Forecast</h2>
      <div className="grid grid-cols-5 gap-2">
        {forecast.map((day, index) => (
          <div key={index} className="p-3 text-center bg-white dark:bg-gray-700 rounded-lg shadow transition-all duration-200">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <Image
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.condition}
              width={50}
              height={50}
              className="mx-auto"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{day.condition}</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {Math.round(day.temperature)}{temperatureUnit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
