'use client';

interface SearchHistoryProps {
  history: string[];
  onSelect: (city: string) => void;
  onClearHistory?: () => void;
}

export default function SearchHistory({ history, onSelect, onClearHistory }: SearchHistoryProps) {
  // Don't render anything if there's no search history
  if (history.length === 0) return null;
  
  return (
    <div 
      className="w-full max-w-md mt-4 animate-fadeIn"
      role="region"
      aria-label="Recent searches"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Recent Searches</h2>
        {onClearHistory && (
          <button
            onClick={onClearHistory}
            className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label="Clear search history"
          >
            Clear History
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((city, index) => (
          <button
            key={`${city}-${index}`}
            onClick={() => onSelect(city)}
            className="px-3 py-1 text-sm text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label={`Search for ${city}`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}