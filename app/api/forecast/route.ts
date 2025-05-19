import { NextResponse } from 'next/server';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const units = searchParams.get('units') || 'metric';
  
  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${units}`
    );
    
    if (!forecastResponse.ok) {
      throw new Error('Forecast data not found');
    }
    
    const forecastData = await forecastResponse.json();
    
    // Process the forecast data
    const dailyForecasts = [];
    const processedDates = new Set();
    
    for (const item of forecastData.list) {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!processedDates.has(date)) {
        processedDates.add(date);
        dailyForecasts.push({
          date,
          temperature: item.main.temp,
          condition: item.weather[0].description,
          icon: item.weather[0].icon,
        });
        
        // Get 5 days only
        if (dailyForecasts.length >= 5) break;
      }
    }
    
    return NextResponse.json(dailyForecasts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch forecast data' },
      { status: 500 }
    );
  }
}