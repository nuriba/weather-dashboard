import useSWR from 'swr';
import { WeatherData, ForecastData } from '../types/weather';
import { getCurrentWeather, getForecast } from '../services/weatherService';
import { useRef } from 'react';

export function useWeatherQuery(city: string, units: 'metric' | 'imperial') {
  const lastUpdatedRef = useRef<Date | null>(null);

  const {
    data: weatherData,
    error: weatherError,
    isLoading: isWeatherLoading,
  } = useSWR<WeatherData>(
    city ? ['weather', city, units] : null,
    async () => {
      const data = await getCurrentWeather(city, units);
      lastUpdatedRef.current = new Date();
      return data;
    }
  );

  const {
    data: forecastData,
    error: forecastError,
    isLoading: isForecastLoading,
  } = useSWR<ForecastData[]>(
    city ? ['forecast', city, units] : null,
    () => getForecast(city, units)
  );

  return {
    weatherData,
    forecastData,
    isLoading: isWeatherLoading || isForecastLoading,
    error: weatherError || forecastError,
    lastUpdated: lastUpdatedRef.current,
  };
}