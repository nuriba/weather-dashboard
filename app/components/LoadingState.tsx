export default function LoadingState() {
    return (
      <div className="w-full max-w-md mt-6 space-y-4">
        <div className="h-8 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    );
  }