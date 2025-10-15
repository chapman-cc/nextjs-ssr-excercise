'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Accidents list error:', error);
  }, [error]);

  return (
    <div className="container mx-auto py-6">
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Failed to Load Accidents</CardTitle>
          <CardDescription>
            An error occurred while fetching the accidents list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm font-mono text-muted-foreground break-all">
                {error.message || 'Unknown error occurred'}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-muted-foreground mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                This could be caused by:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Network connection issues</li>
                <li>Server is not running (make sure json-server is started)</li>
                <li>API endpoint is unavailable</li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => reset()} variant="default">
                Try Again
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline">
                Reload Page
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
