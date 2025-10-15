import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="min-h-dvh flex justify-center items-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <span className="ml-4 text-sm text-muted-foreground">Loading accident details...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
