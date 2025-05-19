export interface WeatherData {
    city: string;
    country: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
  }
  
  export interface ForecastData {
    date: string;
    temperature: number;
    condition: string;
    icon: string;
  }