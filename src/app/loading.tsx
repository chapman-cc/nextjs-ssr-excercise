export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-sm text-muted-foreground">Loading page...</p>
        </div>
      </div>
    </div>
  );
}
