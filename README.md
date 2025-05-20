# Weather Dashboard

A modern, responsive weather dashboard built with Next.js, TypeScript, and Tailwind CSS. Search for real-time weather and 5-day forecasts for any city worldwide.

---

## 🚀 Features
- **Real-time weather data** for any city
- **5-day weather forecast**
- **Temperature unit toggle** (Celsius/Fahrenheit)
- **Search history** (last 5 searches, persisted)
- **Clear history** button
- **Dark mode** toggle
- **Loading spinner** and clear error handling
- **Weather icons** with image optimization
- **Keyboard accessible** and accessible for screen readers
- **Animated transitions** for a polished UI

### Note: 
I have tried to add a button to toggle between light and dark mode, but I got some errors. Therefore, I leave the web app as it.
---

## 🛠 Tech Stack
- [Next.js 15](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [SWR](https://swr.vercel.app/)
- [OpenWeatherMap API](https://openweathermap.org/api)

---

## ▶️ Live Demo
[View on Vercel](https://weather-dashboard-three-chi.vercel.app/)

---

## 🖥️ How to run locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your OpenWeatherMap API key:
     ```env
     NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 📝 Notes / Assumptions
- **API Key Security:** The OpenWeatherMap API key is required. For public deployments, consider using a Next.js API route as a proxy for better security, even though the key is not highly sensitive.
- **Design Decisions:**
  - Zustand is used for simple, global state management (search history, units, etc.)
  - SWR is used for efficient data fetching and caching.
  - All weather icons use Next.js `<Image />` for optimization.
  - The UI is built with accessibility and keyboard navigation in mind.
  - Animations and transitions are handled via Tailwind CSS for a smooth user experience.
- **Error Handling:** The app displays user-friendly error messages and only shows errors after a search is performed.
- **Responsiveness:** The layout adapts to all device sizes, with dark mode support.
