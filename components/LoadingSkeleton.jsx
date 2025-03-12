export default function LoadingSkeleton() {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }