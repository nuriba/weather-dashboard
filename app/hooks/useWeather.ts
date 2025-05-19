import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast } from '../services/weatherService';
import { WeatherData, ForecastData } from '../types/weather';

export function useWeather() {
  const [city, setCity] = useState<string>('');
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  // Save search history to localStorage
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);
  
  const fetchWeather = async (searchCity: string) => {
    if (!searchCity.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const weatherData = await getCurrentWeather(searchCity, units);
      const forecastData = await getForecast(searchCity, units);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      
      // Update search history
      updateSearchHistory(searchCity);
      
    } catch (err) {
      setError('City not found or there was an error fetching weather data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateSearchHistory = (searchCity: string) => {
    setSearchHistory(prev => {
      // Remove the city if it already exists
      const filteredHistory = prev.filter(item => item.toLowerCase() !== searchCity.toLowerCase());
      
      // Add the city to the beginning and limit to 5 items
      return [searchCity, ...filteredHistory].slice(0, 5);
    });
  };
  
  const toggleUnits = () => {
    setUnits(prev => {
      const newUnits = prev === 'metric' ? 'imperial' : 'metric';
      
      // Refetch weather with new units if we have a city
      if (currentWeather) {
        fetchWeather(currentWeather.city);
      }
      
      return newUnits;
    });
  };
  
  return {
    city,
    setCity,
    units,
    currentWeather,
    forecast,
    isLoading,
    error,
    searchHistory,
    fetchWeather,
    toggleUnits
  };
}