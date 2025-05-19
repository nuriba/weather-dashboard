interface ErrorDisplayProps {
  error: Error | null;
  hasSearched: boolean;
}

export default function ErrorDisplay({ error, hasSearched }: ErrorDisplayProps) {
  if (!hasSearched) return null;
  if (!error) return null;

  return (
    <div className="w-full max-w-md p-4 mt-4 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded-lg">
      <p className="font-medium">Error</p>
      <p>{error.message || 'An error occurred while fetching weather data.'}</p>
    </div>
  );
}