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
      <h2 className="mb-4 text-xl font-semibold">5-Day Forecast</h2>
      <div className="grid grid-cols-5 gap-2">
        {forecast.map((day, index) => (
          <div key={index} className="p-3 text-center bg-white rounded-lg shadow">
            <p className="text-sm font-medium text-gray-600">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <Image
              src={`http://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.condition}
              width={50}
              height={50}
              className="mx-auto"
            />
            <p className="text-sm text-gray-500 capitalize">{day.condition}</p>
            <p className="text-lg font-semibold">
              {Math.round(day.temperature)}{temperatureUnit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}