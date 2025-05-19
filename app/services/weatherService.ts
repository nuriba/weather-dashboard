import { WeatherData, ForecastData } from '../types/weather';

export async function getCurrentWeather(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> {
  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&units=${units}`);
    
    if (!response.ok) {
      throw new Error('City not found or API error');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getForecast(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData[]> {
  try {
    const response = await fetch(`/api/forecast?city=${encodeURIComponent(city)}&units=${units}`);
    
    if (!response.ok) {
      throw new Error('City not found or API error');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}