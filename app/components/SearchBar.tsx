'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (city: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ value, onChange, onSearch, isLoading }: SearchBarProps) {
  // Prevent form submission if input is empty
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex w-full max-w-md gap-2 mb-4"
      role="search"
      aria-label="Search for a city"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter city name..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200"
        disabled={isLoading}
        aria-label="City name"
        aria-busy={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-800"
        aria-label="Search for weather"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}