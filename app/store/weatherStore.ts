'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WeatherState {
  city: string;
  searchHistory: string[];
  units: 'metric' | 'imperial';
  
  setCity: (city: string) => void;
  toggleUnits: () => void;
  selectFromHistory: (city: string) => void;
  clearHistory: () => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      city: '',
      searchHistory: typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem('searchHistory') || '[]') 
        : [],
      units: 'metric',
      
      setCity: (city: string) => {
        if (!city.trim()) return;
        
        set((state) => ({
          city,
          searchHistory: [
            city,
            ...state.searchHistory.filter((c) => c !== city),
          ].slice(0, 5),
        }));
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('searchHistory', JSON.stringify(get().searchHistory));
        }
      },
      
      toggleUnits: () => {
        const { units } = get();
        const newUnits = units === 'metric' ? 'imperial' : 'metric';
        set({ units: newUnits });
      },
      
      selectFromHistory: (city: string) => {
        get().setCity(city);
      },
      
      clearHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: 'weather-storage',
    }
  )
);